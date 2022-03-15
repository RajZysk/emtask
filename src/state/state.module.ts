import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateController } from './state.controller';
import { StateRepository } from './state.repository';
import { StateService } from './state.service';

@Module({
  imports: [TypeOrmModule.forFeature([StateRepository])],
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
