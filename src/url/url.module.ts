import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { UrlEntity } from 'src/entities/url.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UrlEntity
    ]),
  ],
  providers: [UrlService],
  controllers: [UrlController],
  exports: [UrlService]
})
export class UrlModule { }
