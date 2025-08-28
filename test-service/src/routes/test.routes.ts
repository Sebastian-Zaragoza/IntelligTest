import {Router} from "express";
import {param, body} from "express-validator";
import {handleInputErrors} from "../middlewares/validation";
import {deleteTest, evaluateTest, generateTest, getTestGenerated} from "../controllers/test.controller";

const router = Router();
router.get("/:sectionId/generate-test",
    param("sectionId")
        .notEmpty().withMessage("SectionId is required"),
    handleInputErrors,
    generateTest
)
router.post("/:sectionId/evaluate-test",
    param("sectionId")
        .notEmpty().withMessage("SectionId is required"),
    body("strict")
        .notEmpty().withMessage("Strict mode is required"),
    body().custom((body) => {
        const keys = Object.keys(body);
        const answerKeys = keys.filter(k => /^answer_\d+$/.test(k));

        if (answerKeys.length === 0) {
            throw new Error("No answers provided");
        }

        for (const key of answerKeys) {
            const value = body[key];
            if (typeof value !== 'string' || value.trim() === "") {
                throw new Error(`Answer for ${key} must be a non-empty string`);
            }
        }
        return true;
    }),
    handleInputErrors,
    evaluateTest
)
router.delete("/:sectionId/test",
    param("sectionId")
        .notEmpty().withMessage("SectionId is required"),
    handleInputErrors,
    deleteTest
)
router.get("/:sectionId/test",
    param("sectionId")
    .notEmpty().withMessage("SectionId is required"),
    handleInputErrors,
    getTestGenerated
)
export default router;