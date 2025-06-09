import {Router} from "express";
import {param} from "express-validator";
import {handleInputErrors} from "../middlewares/validation";
import {generateTest} from "../controllers/test.controller";

const router = Router();
router.get("/:sectionId/generate-test",
    param("sectionId")
        .notEmpty().withMessage("SectionId is required"),
    handleInputErrors,
    generateTest
)

export default router;