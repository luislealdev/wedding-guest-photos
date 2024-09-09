'use server';
import { v2 as cloudinary } from 'cloudinary';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { revalidatePath } from 'next/cache';

cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL ?? '' });

const memorySchema = z.object({
    uploadedBy: z.string(),
    // Agrega más validaciones si es necesario
});

export const createMemory = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const memoryParsed = memorySchema.safeParse(data);

    if (!memoryParsed.success) {
        console.log(memoryParsed.error);
        return { ok: false, message: 'Error de validación' };
    }

    const memoryToUpload = memoryParsed.data;

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {

            const memory = await prisma.memory.create({
                data: {
                    uploadedBy: memoryToUpload.uploadedBy,
                }
            });

            if (formData.has('images')) {
                const images = await uploadImages(formData.getAll('images') as File[]);
                if (!images) {
                    throw new Error('No se pudo cargar las imágenes, rollback.');
                }

                await tx.memoryImage.createMany({
                    data: images.map((image) => ({
                        url: image!,
                        memoryId: memory.id,
                    })),
                });
            }

            return { memory }; // Devuelve el memory creado o actualizado
        });

        // Revalida la caché en la ruta especificada
        revalidatePath('/');

        return {
            ok: true,
            memory: prismaTx.memory,
        };
    } catch (error) {
        console.error('Error en la transacción:', error);
        return {
            ok: false,
            message: 'No se pudo crear la memoria. Verifica los logs.',
        };
    }
};

const uploadImages = async (images: File[]) => {
    try {
        const uploadPromises = images.map(async (image) => {
            try {
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');
                const response = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`);
                return response.secure_url;
            } catch (error) {
                console.error('Error al subir imagen:', error);
                return null;
            }
        });

        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages.filter((url) => url !== null); // Filtra cualquier null
    } catch (error) {
        console.error('Error en la carga de imágenes:', error);
        return null;
    }
};
