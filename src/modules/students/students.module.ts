import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentRepository } from './students.repository';
import { Student } from 'src/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentsService, StudentRepository],
  controllers: [StudentsController],
})
export class StudentsModule {}
