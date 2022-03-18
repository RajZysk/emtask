import { Country } from 'src/entities/country.entity';
import { State } from 'src/entities/state.entity';
import { IsActive } from 'src/service/isactive';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CreateStateDto } from './dto/createstate.dto';
import { v4 as uuid } from 'uuid';
@EntityRepository(State)
export class StateRepository extends Repository<State> {
  async findAllState(search): Promise<any> {
    try {
      const { countryName } = search;
      const query = this.createQueryBuilder('state');
      if (countryName) {
        const country = await getRepository(Country)
          .createQueryBuilder('countries')
          .where('countries.country_name=:countryName', { countryName })
          .getOne();
        const relation = await query
          .where('state.country=:countryid', {
            countryid: country.id,
          })
          .execute();
        return relation;
      } else return query.getMany();
    } catch (error) {
      throw new Error('error in finding all states');
    }
  }
  async findState(slug: string): Promise<any> {
    try {
      const foundState = await this.createQueryBuilder()
        .where({ slug })
        .getOne();
      if (!foundState) {
        return { mes: 'state not found' };
      }
      return foundState;
    } catch (error) {
      throw new Error('error while getting state by id');
    }
  }
  async createState(stateDto: CreateStateDto): Promise<any> {
    try {
      const { state_name, country } = stateDto;
      const state = await this.createQueryBuilder()
        .where({ state_name })
        .getOne();
      if (!state) {
        const countryid = await getRepository(Country)
          .createQueryBuilder('countries')
          .where('countries.country_name=:countryname', {
            countryname: country,
          })
          .getOne();
        return this.createQueryBuilder()
          .insert()
          .into(State)
          .values({
            state_name,
            isActive: IsActive.active,
            slug: uuid(),
            country: countryid.id as any,
          })
          .execute();
      } else return { msg: 'state already exists' };
    } catch (error) {
      throw new Error('error while creating new state');
    }
  }
  async updateStateStatus(slug: string, status: IsActive): Promise<any> {
    try {
      return await this.createQueryBuilder()
        .where({ slug })
        .update(State)
        .set({ isActive: status })
        .execute();
    } catch (error) {
      throw new Error('error in changing the state status');
    }
  }
}
