import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Contatos API (e2e)', () => {
  let app: INestApplication;
  let contatoId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /contatos — deve criar um contato', async () => {
    const res = await request(app.getHttpServer())
      .post('/contatos')
      .send({ nome: 'Teste E2E', email: 'teste@e2e.com', telefone: '85900000000' })
      .expect(201);

    expect(res.body.nome).toBe('Teste E2E');
    expect(res.body.email).toBe('teste@e2e.com');
    expect(res.body.id).toBeDefined();

    contatoId = res.body.id; // salva o id para usar nos próximos testes
  });

  it('GET /contatos — deve listar contatos', async () => {
    const res = await request(app.getHttpServer())
      .get('/contatos')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /contatos/:id — deve buscar por id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/contatos/${contatoId}`)
      .expect(200);

    expect(res.body.id).toBe(contatoId);
    expect(res.body.nome).toBe('Teste E2E');
  });

  it('PUT /contatos/:id — deve atualizar o contato', async () => {
    const res = await request(app.getHttpServer())
      .put(`/contatos/${contatoId}`)
      .send({ telefone: '85911111111' })
      .expect(200);

    expect(res.body.telefone).toBe('85911111111');
  });

  it('DELETE /contatos/:id — deve deletar o contato', async () => {
    await request(app.getHttpServer())
      .delete(`/contatos/${contatoId}`)
      .expect(200);
  });

  it('GET /contatos/:id — deve retornar null após deletar', async () => {
    const res = await request(app.getHttpServer())
      .get(`/contatos/${contatoId}`)
      .expect(200);

expect(res.body).toEqual({});    
  });
});