// packages/lib/src/services/reelService.ts

import { prisma } from '../../prisma';

export const reelService = {
    async getPaginated(skip: number, take: number, search: string) {
        return prisma.reel.findMany({
            where: {
                title: {
                    startsWith: search,
                    mode: 'insensitive',
                },
            },
            skip,
            take,
            orderBy: { createdAt: 'desc' },
        });
    },

    async countAll(search: string) {
        return prisma.reel.count({
            where: {
                title: {
                    startsWith: search,
                    mode: 'insensitive',
                },
            },
        });
    },

    async getById(id: number) {
        return prisma.reel.findUnique({ where: { id } });
    },

    async create(data: { title: string; link: string }) {
        return prisma.reel.create({ data });
    },

    async update(id: number, data: { title?: string; link?: string }) {
        return prisma.reel.update({ where: { id }, data });
    },

    async delete(id: number) {
        return prisma.reel.delete({ where: { id } });
    }
};