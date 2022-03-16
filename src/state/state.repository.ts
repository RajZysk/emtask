import { State } from 'src/entities/state.entity';
import { IsActive } from 'src/service/isactive';
import { EntityRepository, Repository } from 'typeorm';
import { CreateStateDto } from './dto/createstate.dto';
@EntityRepository(State)
export class StateRepository extends Repository<State> {
  async findAllState(): Promise<{}> {
    try {
      return await this.createQueryBuilder()
        .orderBy('state_name', 'ASC')
        .getMany();
    } catch (error) {
      throw new Error('error in finding all states');
    }
  }
  async findState(id: string): Promise<any> {
    try {
      const foundState = await this.createQueryBuilder().where({ id }).getOne();
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
      const { state_name } = stateDto;
      const state = await this.createQueryBuilder()
        .where({ state_name })
        .getOne();
      if (!state) {
        return this.createQueryBuilder()
          .insert()
          .into(State)
          .values({ state_name, isActive: IsActive.active })
          .execute()
          .then(() => `${state_name} created successfully`);
      } else return { msg: 'state already exists' };
    } catch (error) {
      throw new Error('error while creating new state');
    }
  }
  async updateStateStatus(id: string, status: IsActive): Promise<any> {
    try {
      return await this.createQueryBuilder()
        .where({ id })
        .update(State)
        .set({ isActive: status })
        .execute();
    } catch (error) {
      throw new Error('error in chaning the state status');
    }
  }
}
