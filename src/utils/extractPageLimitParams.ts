import { PageLimit, TypedRequestQuery } from '../types';

/**
 * Helper function to extract and validate request parameters.
 * @param req - The Express request object.
 * @returns An object containing the validated parameters.
 */
export function extractPageLimitParams(req: TypedRequestQuery<PageLimit>) {
   const params = {
      page: parseInt(req.query.page.number as unknown as string, 10) || 1, // Default to 1 if not provided
      limit: parseInt(req.query.page.size, 10) || 10, // Default to 10 if not provided
      skip: 0
   };
   params.skip = (params.page - 1) * params.limit;

   return params;
}

