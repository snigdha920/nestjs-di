import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { AuthorModule } from '../author/author.module';

@Module({
  imports: [AuthorModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
