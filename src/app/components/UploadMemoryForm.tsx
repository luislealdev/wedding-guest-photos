'use client';
import { useForm } from "react-hook-form";
import { createMemory } from "../../actions/upload-memory-action";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import imageCompression from 'browser-image-compression';

interface FormInputs {
    uploadedBy: string;
    images?: FileList;
}

export const UploadMemoryForm = () => {
    const router = useRouter();
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const { handleSubmit, register } = useForm<FormInputs>({
        defaultValues: {
            uploadedBy: '',
            images: undefined,
        },
    });

    const handleImagePreview = async (files: FileList | undefined) => {
        if (files) {
            const compressedImages = await Promise.all(
                Array.from(files).map(async (file) => {
                    try {
                        const options = {
                            maxSizeMB: 1, // Limita el tamaño máximo de la imagen a 1MB
                            maxWidthOrHeight: 800, // Reduce la resolución de la imagen a un máximo de 800px
                            useWebWorker: true, // Usa un Web Worker para mejorar el rendimiento
                        };
                        const compressedFile = await imageCompression(file, options);
                        return URL.createObjectURL(compressedFile); // Genera una URL para previsualizar
                    } catch (error) {
                        console.error('Error al comprimir imagen:', error);
                        return URL.createObjectURL(file); // En caso de error, muestra la imagen original
                    }
                })
            );
            setPreviewImages(compressedImages);
        } else {
            setPreviewImages([]);
        }
    };

    const onSubmit = async (data: FormInputs) => {
        setLoading(true);
        const formData = new FormData();
        const { images, uploadedBy } = data;

        formData.append("uploadedBy", uploadedBy);

        if (images) {
            // Comprime las imágenes antes de subirlas
            for (let i = 0; i < images.length; i++) {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 800,
                    useWebWorker: true,
                };
                const compressedFile = await imageCompression(images[i], options);
                formData.append('images', compressedFile); // Añadir la imagen comprimida al FormData
            }
        }

        const { ok } = await createMemory(formData);

        if (!ok) {
            alert('Memoria no se pudo agregar');
            setLoading(false);
            return;
        }

        router.push('/');
        setLoading(false);
    };

    return (
        <>
            <form className="memory-form mt-50" onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="ph-20 p-10 radius-30 no-border"
                    type="text"
                    autoComplete='name'
                    placeholder='Nombre del creador'
                    {...register('uploadedBy', { required: true })}
                />

                <input
                    className="mt-20 file-input"
                    placeholder="Selecciona las imágenes"
                    type="file"
                    {...register('images', {
                        onChange: (e) => handleImagePreview(e.target.files)
                    })}
                    multiple
                    accept="image/png, image/jpeg, image/avif, image/webp"
                />

                {/* Previsualización de imágenes */}
                {previewImages.length > 0 && (
                    <div className="preview-container mt-20">
                        {previewImages.map((src, index) => (
                            <div key={index} className="preview-item">
                                <Image width={1000} height={1000} src={src} alt={`Preview ${index}`} className="preview-image max-width" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Botón de subida */}
                <button className="submit-btn mt-20" type="submit" disabled={loading}>
                    {loading ? 'Subiendo...' : 'Subir'}
                </button>

                {/* Mensaje de carga */}
                {loading && <p className="loading-message">Subiendo las imágenes, por favor espera...</p>}
            </form>

            <style jsx>{`
                .memory-form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .file-input {
                    padding: 10px;
                    border-radius: 10px;
                    border: 1px solid #ccc;
                }

                .preview-container {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .preview-item {
                    width: 100px;
                    height: 100px;
                    border: 2px solid #ccc;
                    border-radius: 10px;
                    overflow: hidden;
                }

                .preview-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .submit-btn {
                    padding: 10px 20px;
                    border-radius: 20px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    cursor: pointer;
                }

                .submit-btn:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }

                .loading-message {
                    margin-top: 10px;
                    font-size: 16px;
                    color: #555;
                }
            `}</style>
        </>
    );
};
