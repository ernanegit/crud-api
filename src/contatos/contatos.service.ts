import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContatosService {
  constructor(private prisma: PrismaService) {}

  async criar(data: { nome: string; email: string; telefone?: string }) {
    return this.prisma.contato.create({ data });
  }

  async listar() {
    return this.prisma.contato.findMany();
  }

  async buscarPorId(id: number) {
    return this.prisma.contato.findUnique({ where: { id } });
  }

  async atualizar(id: number, data: { nome?: string; email?: string; telefone?: string }) {
    return this.prisma.contato.update({ where: { id }, data });
  }

  async deletar(id: number) {
    return this.prisma.contato.delete({ where: { id } });
  }
}