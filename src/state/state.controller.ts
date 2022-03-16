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
  @Get('/:slug')
  findSate(@Param('slug') slug: string) {
    return this.stateService.findState(slug);
  }
  @Post()
  createState(@Body() stateDto: CreateStateDto) {
    return this.stateService.createState(stateDto);
  }
  @Patch('/:slug')
  updateStateStatus(@Param('slug') slug: string, @Body('status') status: IsActive) {
    return this.stateService.updateStateStatus(slug, status);
  }
}
