import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsActive } from 'src/service/isactive';
import { CreateStateDto } from './dto/createstate.dto';
import { StateRepository } from './state.repository';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateRepository)
    private satateRepository: StateRepository,
  ) {}
  findAllState() {
    return this.satateRepository.findAllState();
  }
  findState(id: string) {
    return this.satateRepository.findState(id);
  }
  createState(stateDto: CreateStateDto) {
    return this.satateRepository.createState(stateDto);
  }
  updateStateStatus(id: string, status: IsActive) {
    return this.satateRepository.updateStateStatus(id, status);
  }
}
