"use client";
import { useForm } from "react-hook-form";
import { createMemory } from "../../actions/upload-memory-action";
import { useRouter } from "next/navigation";
import React from "react";

interface FormInputs {
    uploadedBy: string;
    images?: FileList;
}

export const UploadMemoryForm = () => {

    const router = useRouter();

    const {
        handleSubmit,
        register,
    } = useForm<FormInputs>({
        defaultValues: {
            uploadedBy: '',
            images: undefined,
        },
    });

    const onSubmit = async (data: FormInputs) => {
        const formData = new FormData();

        const { images, uploadedBy } = data;

        formData.append("uploadedBy", uploadedBy);

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }

        const { ok } = await createMemory(formData);

        if (!ok) {
            alert('Memoria no se pudo agregar');
            return;
        }

        router.push('/');

    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <input type="text" autoComplete='name' placeholder='Nombre' {...register('uploadedBy', { required: true })} />

                <input
                    type="file"
                    {...register('images')}
                    multiple
                    accept="image/png, image/jpeg, image/avif, image/webp"
                />
                <button type="submit">Subir</button>
            </form>
        </>
    )
}
