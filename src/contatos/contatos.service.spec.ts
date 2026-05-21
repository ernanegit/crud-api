import { Test, TestingModule } from '@nestjs/testing';
import { ContatosService } from './contatos.service';
import { PrismaService } from '../prisma/prisma.service';

// Mock do PrismaService — simula o banco sem conectar de verdade
const mockPrismaService = {
  contato: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ContatosService', () => {
  let service: ContatosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContatosService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ContatosService>(ContatosService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // limpa os mocks após cada teste
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um contato', async () => {
    const dto = { nome: 'João', email: 'joao@email.com', telefone: '85911111111' };
    const resultado = { id: 1, ...dto, createdAt: new Date() };

    mockPrismaService.contato.create.mockResolvedValue(resultado);

    const retorno = await service.criar(dto);

    expect(mockPrismaService.contato.create).toHaveBeenCalledWith({ data: dto });
    expect(retorno).toEqual(resultado);
  });

  it('deve listar todos os contatos', async () => {
    const contatos = [
      { id: 1, nome: 'João', email: 'joao@email.com', telefone: '85911111111', createdAt: new Date() },
      { id: 2, nome: 'Maria', email: 'maria@email.com', telefone: '85922222222', createdAt: new Date() },
    ];

    mockPrismaService.contato.findMany.mockResolvedValue(contatos);

    const retorno = await service.listar();

    expect(mockPrismaService.contato.findMany).toHaveBeenCalled();
    expect(retorno).toHaveLength(2);
  });

  it('deve buscar um contato por id', async () => {
    const contato = { id: 1, nome: 'João', email: 'joao@email.com', telefone: '85911111111', createdAt: new Date() };

    mockPrismaService.contato.findUnique.mockResolvedValue(contato);

    const retorno = await service.buscarPorId(1);

    expect(mockPrismaService.contato.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(retorno).toEqual(contato);
  });

  it('deve atualizar um contato', async () => {
    const atualizado = { id: 1, nome: 'João', email: 'joao@email.com', telefone: '85999999999', createdAt: new Date() };

    mockPrismaService.contato.update.mockResolvedValue(atualizado);

    const retorno = await service.atualizar(1, { telefone: '85999999999' });

    expect(mockPrismaService.contato.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { telefone: '85999999999' },
    });
    expect(retorno.telefone).toBe('85999999999');
  });

  it('deve deletar um contato', async () => {
    const contato = { id: 1, nome: 'João', email: 'joao@email.com', telefone: '85911111111', createdAt: new Date() };

    mockPrismaService.contato.delete.mockResolvedValue(contato);

    const retorno = await service.deletar(1);

    expect(mockPrismaService.contato.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(retorno).toEqual(contato);
  });
});