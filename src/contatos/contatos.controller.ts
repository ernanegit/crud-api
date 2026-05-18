import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ContatosService } from './contatos.service';

@Controller('contatos')
export class ContatosController {
  constructor(private readonly contatosService: ContatosService) {}

  @Post()
  criar(@Body() body: { nome: string; email: string; telefone?: string }) {
    return this.contatosService.criar(body);
  }

  @Get()
  listar() {
    return this.contatosService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.contatosService.buscarPorId(+id);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() body: { nome?: string; email?: string; telefone?: string }) {
    return this.contatosService.atualizar(+id, body);
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.contatosService.deletar(+id);
  }
}