import { Router } from 'express';
import { JobController } from '../controllers';
import { validate } from '../middlewares';
import {
   createJobSchema,
   deleteJobSchema,
   getJobSchema,
   updateJobSchema,
} from '../schemas';
const router = Router();

router
   .route('/')
   .get(JobController.index)
   .post(
      validate(createJobSchema),
      JobController.create
   );

router
   .route('/:id')
   .get(validate(getJobSchema), JobController.show)
   .put(
      validate(updateJobSchema),
      JobController.update
   )
   .delete(validate(deleteJobSchema), JobController.delete);

export default router;
