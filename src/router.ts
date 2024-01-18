import { Router } from "express";
import * as pdHandler from './handlers/product'
import * as updateHandler from './handlers/update'
import { body } from "express-validator";
import { errorValidation } from "./modules/middlewares";


const router = Router();
/**
 * Product
 */
router.post("/product",
  body(['name']).exists().isString(),
  errorValidation,
  pdHandler.create
);
router.put("/product/:id",
  body(['name']).optional().isString(),
  errorValidation,
  pdHandler.update
);
router.get("/product", pdHandler.getAll);
router.get("/product/:id", pdHandler.getByID);
router.delete("/product/:id", pdHandler.remove);

/**
 * Update
 */

router.post("/update",
  body(['title', 'body', 'productId']).exists().isString(),
  errorValidation,
  updateHandler.create
);
router.put("/update/:id",
  body(['title', 'body', 'version']).optional().isString(),
  body('status').optional().isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']),
  errorValidation,
  updateHandler.update
);
router.get("/update", updateHandler.getAll);
router.get("/update/:id", updateHandler.getByID);
router.delete("/update/:id", updateHandler.remove);

export default router;