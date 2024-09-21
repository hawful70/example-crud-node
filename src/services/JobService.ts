import {
   FindManyOptions,
   FindOptions,
   FindOptionsRelations,
   FindOptionsSelect,
   FindOptionsWhere,
} from 'typeorm';
import { Job } from '../entities';
import { AppDataSource } from '../utils';

export class JobService {
   private static readonly jobRepository = AppDataSource.getRepository(Job);

   public static async index(
      pagination: FindManyOptions<Job> = {},
      where: FindOptionsWhere<Job> = {},
      select: FindOptionsSelect<Job> = {},
      relations: FindOptionsRelations<Job> = {}
   ): Promise<[Job[], number]> {
      const data = await JobService.jobRepository.findAndCount({
         skip: pagination.skip,
         take: pagination.take,
         where,
         select,
         relations,
      });

      return data;
   }

   public static async findById(jobId: string): Promise<Job | null> {
      return await JobService.jobRepository.findOneBy({ id: jobId });
   }

   public static async create(
      payload: Partial<Job>,
   ): Promise<Job> {
      const create = JobService.jobRepository.create({ ...payload });
      return await JobService.jobRepository.save(create);
   }

}
