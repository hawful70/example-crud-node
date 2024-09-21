import { Request, NextFunction } from 'express';
import { JobService } from '../services';
import { PageLimit, Res, TypedRequestBody, TypedRequestQuery } from '../types';
import { AppError, extractPageLimitParams, paginateResponse } from '../utils';
import { CreateJob, DeleteJob, GetJob, UpdateJob } from '../schemas';

export class JobController {
   public static async index(
      req: TypedRequestQuery<PageLimit>,
      res: Res,
      next: NextFunction
   ) {
      try {
         const { page, limit, skip } = extractPageLimitParams(req);
         const data = await JobService.index({
            skip,
            take: limit,
         });
         paginateResponse(res, data, page, limit);
      } catch (err: unknown) {
         next(err);
      }
   }

   public static async show(
      req: Request<GetJob>,
      res: Res,
      next: NextFunction
   ) {
      try {
         const job = await JobController.findJobById(
            req.params.id,
            next
         );
         if (!job) {
            return;
         }
         res.json(job);
      } catch (err: unknown) {
         next(err);
      }
   }

   public static async create(
      req: TypedRequestBody<CreateJob>,
      res: Res,
      next: NextFunction
   ) {
      try {
         const job = await JobService.create(req.body);
         res.status(201).json(job);
      } catch (err: unknown) {
         if (err.code === '23505') {
            return res.status(409).json({
               status: 'fail',
               message: 'Job with that title already exist',
            });
         }
         next(err);
      }
   }

   public static async update(
      req: Request<UpdateJob['params'], {}, UpdateJob['body']>,
      res: Res,
      next: NextFunction
   ) {
      try {
         const job = await JobController.findJobById(
            req.params.id,
            next
         );
         if (!job) {
            return;
         }
         Object.assign(job, req.body);
         await job.save();
         res.sendStatus(200);
      } catch (err: unknown) {
         next(err);
      }
   }

   public static async delete(
      req: Request<DeleteJob>,
      res: Res,
      next: NextFunction
   ) {
      try {
         const job = await JobController.findJobById(
            req.params.id,
            next
         );
         if (!job) {
            return;
         }

         await job.remove();
         res.sendStatus(200);
      } catch (err: unknown) {
         next(err);
      }
   }

   private static async findJobById(jobId: string, next: NextFunction) {
      const job = await JobService.findById(jobId);
      if (!job) {
         next(new AppError(404, 'Job with that ID not found'));
         return null;
      }
      return job;
   }
}
