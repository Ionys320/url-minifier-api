import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from 'src/entities/url.entity';
import { UrlBody } from 'src/interfaces/bodies/url.body';
import { random } from 'src/utils/random';
import { Repository } from 'typeorm';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(UrlEntity)
        private readonly urlRepository: Repository<UrlEntity>
    ) { }

    async findAll() {
        return this.urlRepository.find();
    }

    async findOneByMinified(minified: string) {
        return this.urlRepository.findOneBy({ minified });
    }

    create(data: UrlBody) {
        const url = new UrlEntity();

        url.title = data.title;
        url.tags = data.tags;

        url.base = data.base;
        url.minified = data.minified ?? random();

        return this.urlRepository.save(url);
    }

    update(id: number, data: UrlBody) {
        return this.urlRepository.update(id, {
            title: data.title,
            tags: data.tags,

            base: data.base,
            minified: data.minified
        });
    }

    remove(id: number) {
        return this.urlRepository.delete(id);
    }

    async addVisit(url: UrlEntity) {
        url.visits += 1;
        await this.urlRepository.save(url);
    }
}
