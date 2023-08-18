import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UrlEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    minified: string;

    @Column()
    base: string;

    @Column({ nullable: true })
    title?: string;

    @Column({ nullable: true })
    tags?: string;

    @Column({ default: 0 })
    visits: number;
}