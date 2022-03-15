import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsActive } from 'src/service/isactive';
import { CountryRepository } from './country.repository';
import { CreateCountryDto } from './dto/createcountry.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryRepository)
    private countryRepository: CountryRepository,
  ) {}
  // getting all coutries
  findAllCountry() {
    return this.countryRepository.findAllCountry();
  }
  //getting countries by id
  findCountry(id: string) {
    return this.countryRepository.findCountry(id);
  }
  // creating new country
  createCountry(countryDto: CreateCountryDto) {
    return this.countryRepository.createCountry(countryDto);
  }
  // updating status of country
  changeCountryStatus(id: string, status: IsActive) {
    return this.countryRepository.changeCountryStatus(id, status);
  }
}
