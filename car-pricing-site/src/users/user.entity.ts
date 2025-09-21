import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AfterInsert, AfterRemove, AfterUpdate } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude() // 직렬화 시 제외
    password: string;

    // Insert / Update / Remove 후킹 메서드
    @AfterInsert()
    logInsert() {
        console.log(`Inserted User with id: ${this.id}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Updated User with id: ${this.id}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`Removed User with id: ${this.id}`);
    }
}