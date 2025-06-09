import { prisma } from '../prisma';

export const blogService = {
    async getAll() {
        return prisma.blog.findMany();
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
