import { StudentsModule } from './modules/students/students.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './modules/country/country.module';
import { StateModule } from './modules/state/state.module';
import { TeachersModule } from './modules/teachers/teachers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CountryModule,
    StateModule,
    StudentsModule,
    TeachersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
