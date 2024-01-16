import { BookModule } from './book.module';
import { BookService } from './book.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('BookService', () => {
  let service: BookService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [BookModule],
    }).compile();
    await module.init();

    service = module.get<BookService>(BookService);
  });

  afterAll(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
