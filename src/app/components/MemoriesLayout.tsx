'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import { getPaginatedMemories } from '../../actions/get-paginated-memories';
import Image from 'next/image';
import { MemoryImage } from '@prisma/client';

// Componente para el modal de la imagen ampliada
const ImageModal = ({ image, memory, onClose }: { image: MemoryImage; memory: { uploadedBy: string }; onClose: () => void }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <Image src={image.url} alt="Expanded memory" width={700} height={700} className="expanded-image" />
                <p className="uploaded-by">Subido por: {memory.uploadedBy}</p>
                <button onClick={onClose} className="close-btn">Cerrar</button>
            </div>
        </div>
    );
};

const MemoriesLayout = () => {
    const [page, setPage] = useState(1); // Estado para la paginación
    const [memories, setMemories] = useState<{ memoryImage: MemoryImage[]; id: string; uploadedBy: string; createdAt: Date; }[]>([]); // Almacenar las memorias
    const [loading, setLoading] = useState(false); // Para el estado de carga
    const [totalMemories, setTotalMemories] = useState(0); // Total de memorias disponibles
    const [selectedMemory, setSelectedMemory] = useState<{ image: MemoryImage; memory: { uploadedBy: string } } | null>(null); // Memoria seleccionada

    // Cargar las primeras imágenes al montar el componente
    useEffect(() => {
        const loadInitialMemories = async () => {
            setLoading(true);
            const { memories: initialMemories, totalMemories } = await getPaginatedMemories(1); // Primera página
            setMemories(initialMemories); // Asignar las primeras memorias
            setTotalMemories(totalMemories); // Asignar el total de memorias
            setLoading(false);
        };

        loadInitialMemories();
    }, []);

    // Función para cargar más imágenes
    const loadMore = async () => {
        setLoading(true);
        const { memories: newMemories } = await getPaginatedMemories(page + 1); // Cargar la siguiente página
        setMemories((prev) => [...prev, ...newMemories]); // Agregar nuevas memorias al estado
        setPage(page + 1); // Incrementar la página
        setLoading(false);
    };

    return (
        <div>
            {selectedMemory && (
                <ImageModal
                    image={selectedMemory.image}
                    memory={selectedMemory.memory}
                    onClose={() => setSelectedMemory(null)} // Cerrar el modal
                />
            )}

            {/* Mostrar un mensaje si no hay memorias */}
            {memories.length === 0 ? (
                <div className="center-text mt-50">
                    <h2>No hay memorias disponibles</h2>
                </div>
            ) : (
                <div className="p-40 gap-15 container">
                    {memories.map((memory) =>
                        memory.memoryImage.map((image) => (
                            <div key={image.id} className="item" onClick={() => setSelectedMemory({ image, memory })}>
                                <Image src={image.url} alt={memory.id} width={500} height={500} className="thumbnail" />
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Mostrar el botón de cargar más solo si hay más memorias disponibles */}
            {memories.length < totalMemories && (
                <button className="no-border bg-white ph-20 f-size-24" onClick={loadMore} disabled={loading}>
                    {loading ? 'Cargando...' : 'Cargar más'}
                </button>
            )}
        </div>
    );
};

export default MemoriesLayout;
