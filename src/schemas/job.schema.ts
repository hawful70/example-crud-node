import { TypeOf, object, string, date } from 'zod';

export const createJobSchema = object({
   body: object({
      title: string({
         required_error: 'Title is required',
      }),
      description: string({
         required_error: 'Description is required',
      }),
      expiry: string({
         required_error: 'Expiry date is required',
      })
         .refine(val => /^\d{4}-\d{2}-\d{2}$/.test(val), {
            message: 'Expiry date must be in the format yyyy-mm-dd',
         })
         .transform(val => {
            const date = new Date(val);
            if (isNaN(date.getTime())) {
               throw new Error('Expiry date must be a valid date');
            }
            return date;
         }),
   }),
});

const params = {
   params: object({
      id: string(),
   }),
};

export const getJobSchema = object({
   ...params,
});

export const updateJobSchema = object({
   ...params,
   body: object({
      title: string().optional(),
      description: string().optional(),
      expiry: string()
         .optional() // Keep it as a string for validation
         .refine(val => val === undefined || /^\d{4}-\d{2}-\d{2}$/.test(val), {
            message: 'Expiry date must be in the format yyyy-mm-dd',
         })
         .transform(val => {
            if (val === undefined) return undefined; // Allow undefined
            const date = new Date(val);
            if (isNaN(date.getTime())) {
               throw new Error('Expiry date must be a valid date');
            }
            return date;
         }),
   }).partial(),
});

export const deleteJobSchema = object({
   ...params,
});

export type CreateJob = TypeOf<typeof createJobSchema>['body'];
export type GetJob = TypeOf<typeof getJobSchema>['params'];
export type UpdateJob = TypeOf<typeof updateJobSchema>;
export type DeleteJob = TypeOf<typeof deleteJobSchema>['params'];
