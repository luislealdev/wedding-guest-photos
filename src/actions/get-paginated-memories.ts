"use server";
import prisma from '../lib/prisma';

export const getPaginatedMemories = async (page: number) => {
    const memories = await prisma.memory.findMany({
        take: 10,
        skip: (page - 1) * 10,
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            memoryImage: true,
        },
    });

    const totalMemories = await prisma.memory.count(); // Contar el total de memorias

    return { memories, totalMemories }; // Devolver ambos: memorias y total
};
