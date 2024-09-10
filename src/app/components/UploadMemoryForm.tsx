'use client';
import { useForm } from "react-hook-form";
import { createMemory } from "../../actions/upload-memory-action";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";

interface FormInputs {
    uploadedBy: string;
    images?: FileList;
}

export const UploadMemoryForm = () => {

    const router = useRouter();
    const [previewImages, setPreviewImages] = useState<string[]>([]); // Estado para previsualización de imágenes

    const {
        handleSubmit,
        register,
        // watch
    } = useForm<FormInputs>({
        defaultValues: {
            uploadedBy: '',
            images: undefined,
        },
    });

    // Observar cambios en el campo de imágenes para actualizar las previsualizaciones
    // const images = watch('images');

    // Actualizar las previsualizaciones de las imágenes
    const handleImagePreview = (files: FileList | undefined) => {
        if (files) {
            const previews = Array.from(files).map(file => URL.createObjectURL(file));
            setPreviewImages(previews);
        } else {
            setPreviewImages([]);
        }
    };

    // Función de envío del formulario
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
                className="memory-form mt-50"
                onSubmit={handleSubmit(onSubmit)}
            >
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

                <button className="submit-btn mt-20" type="submit">Subir</button>
            </form>

            {/* CSS inline improvements for better layout */}
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

                .submit-btn:hover {
                    background-color: #45a049;
                }
            `}</style>
        </>
    )
}
