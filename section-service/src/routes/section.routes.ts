import {Router} from 'express';
import {body, param} from "express-validator";
import {handleInputErrors} from "../middlewares/validation";
import {
    createSection,
    deleteSection,
    getSection,
    getSectionById,
    updateSection, updateSectionNote
} from "../controllers/section.controller";

const router = Router();
router.post('/',
    body("name")
        .notEmpty().withMessage("Name is required"),
    body("description")
        .notEmpty().withMessage("Description is required"),
    body("subject")
        .notEmpty().withMessage("Subject is required"),
    handleInputErrors,
    createSection
)
router.get('/',
    getSection
)
router.get('/:id',
    param("id").isMongoId().withMessage('Id is required'),
    handleInputErrors,
    getSectionById
)
router.put('/:id',
    body("name")
        .notEmpty().withMessage("Name is required"),
    body("description")
        .notEmpty().withMessage("Description is required"),
    body("subject")
        .notEmpty().withMessage("Subject is required"),
    handleInputErrors,
    updateSection
)
router.put('/:id/update-section-note',
    param("id").isMongoId().withMessage('Id is required'),
    handleInputErrors,
    updateSectionNote
)
router.delete('/:id',
    param("id").isMongoId().withMessage('Id is required'),
    handleInputErrors,
    deleteSection
)
export default router;