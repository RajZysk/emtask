import { Country } from 'src/entities/country.entity';
import { IsActive } from 'src/service/isactive';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCountryDto } from './dto/createcountry.dto';
@EntityRepository(Country)
export class CountryRepository extends Repository<Country> {
  // getting all coutries
  async findAllCountry(): Promise<any> {
    try {
      return await this.createQueryBuilder()
        .orderBy('country_name', 'ASC')
        .getMany();
    } catch (error) {
      throw new Error("'error in getting all countries'");
    }
  }
  //getting countries by id
  async findCountry(id: string): Promise<any> {
    try {
      const foundCountry = await this.createQueryBuilder()
        .where({ id })
        .getOne();
      if (!foundCountry) {
        return { mes: 'country not found' };
      }
      return foundCountry;
    } catch (error) {
      throw new Error("'error in finding country'");
    }
  }
  // creating new country
  async createCountry(countryDto: CreateCountryDto): Promise<any> {
    try {
      const { country_name } = countryDto;
      const country = await this.createQueryBuilder()
        .where({ country_name })
        .getOne();
      if (!country) {
        return await this.createQueryBuilder()
          .insert()
          .into(Country)
          .values({
            country_name,
            isActive: IsActive.active,
          })
          .execute()
          .then(() => `${country_name} created successfully`)
          .catch(() => {
            'error in creating new task';
          });
      } else return { msg: 'country already exists' };
    } catch (error) {
      throw new Error("'error in creating new country'");
    }
  }
  // updating status of country
  async changeCountryStatus(id: string, status: IsActive): Promise<any> {
    try {
      const report = await this.createQueryBuilder()
        .where({ id })
        .update()
        .set({ isActive: status })
        .execute();
      if (report.affected === 0) {
        return { mes: 'please provide a valid id' };
      }
      return { mes: 'updated successfully' };
    } catch (error) {
      throw new Error('error in  updating');
    }
  }
}
