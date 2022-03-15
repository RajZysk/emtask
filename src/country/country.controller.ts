import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { IsActive } from 'src/service/isactive';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/createcountry.dto';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}
  // getting all coutries
  @Get()
  findAllCountry() {
    return this.countryService.findAllCountry();
  }
  //getting countries by id
  @Get('/:id')
  findCountry(@Param('id') id: string) {
    return this.countryService.findCountry(id);
  }
  // creating new country
  @Post()
  createCountry(@Body() countryDto: CreateCountryDto) {
    return this.countryService.createCountry(countryDto);
  }
  // updating status of country
  @Patch('/:id')
  changeCountryStatus(
    @Param('id') id: string,
    @Body('status') status: IsActive,
  ) {
    return this.countryService.changeCountryStatus(id, status);
  }
}
