import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IsActive } from 'src/service/isactive';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/createcountry.dto';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}
  // getting all coutries
  @Get()
  findAllCountry(@Query() search: any) {
    return this.countryService.findAllCountry(search);
  }
  //getting countries by id
  @Get('/:slug')
  findCountry(@Param('slug') slug: string) {
    return this.countryService.findCountry(slug);
  }
  // creating new country
  @Post('/add')
  createCountry(@Body() countryDto: CreateCountryDto) {
    return this.countryService.createCountry(countryDto);
  }
  // updating status of country
  @Patch('/:slug')
  changeCountryStatus(
    @Param('slug') slug: string,
    @Body('status') status: IsActive,
  ) {
    return this.countryService.changeCountryStatus(slug, status);
  }
}
