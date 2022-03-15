import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { IsActive } from 'src/service/isactive';
import { CreateStateDto } from './dto/createstate.dto';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
  constructor(private stateService: StateService) {}
  @Get()
  findAllState() {
    return this.stateService.findAllState();
  }
  @Get('/:id')
  findSate(@Param('id') id: string) {
    return this.stateService.findState(id);
  }
  @Post()
  createState(@Body() stateDto: CreateStateDto) {
    return this.stateService.createState(stateDto);
  }
  @Patch('/:id')
  updateStateStatus(@Param('id') id: string, @Body('status') status: IsActive) {
    return this.stateService.updateStateStatus(id, status);
  }
}
