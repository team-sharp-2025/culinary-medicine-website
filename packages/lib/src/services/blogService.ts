import { prisma } from '../prisma';

export const blogService = {
    async getPaginated(skip: number, take: number, search: string) {
        return prisma.blog.findMany({
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
        return prisma.blog.count({
            where: {
                title: {
                    startsWith: search,
                    mode: 'insensitive',
                },
            },
        });
    },
    async getById(id: number) {
        return prisma.blog.findUnique({ where: { id } });
    },
    async create(data: { title: string; content: string }) {
        return prisma.blog.create({ data });
    },
    async update(id: number, data: { title?: string; content?: string }) {
        return prisma.blog.update({ where: { id }, data });
    },
    async delete(id: number) {
        return prisma.blog.delete({ where: { id } });
    }
};
