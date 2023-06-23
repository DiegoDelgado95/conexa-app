import { Test, TestingModule } from '@nestjs/testing';
import { NegociosController } from './negocios.controller';
import { NegociosService } from './negocios.service';

describe('NegociosController', () => {
  let negociosController: NegociosController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NegociosController],
      providers: [NegociosService],
    }).compile();

    negociosController = app.get<NegociosController>(NegociosController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {});
  });
});
