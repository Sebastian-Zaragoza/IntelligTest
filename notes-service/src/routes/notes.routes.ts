import {Router} from "express";
import {upload} from "../middlewares/upload";
import {deleteNote, getNote, updateNote, uploadNotes} from "../controllers/notes.controller";
import {body, param} from "express-validator";
import {handleInputErrors} from "../middlewares/validation";

const router  = Router();

router.post("/:sectionId/upload",
    param("sectionId").isMongoId().withMessage("Id is required"),
    handleInputErrors,
    upload.single("file"),
    uploadNotes
)
router.get("/:sectionId/notes",
    param("sectionId").isMongoId().withMessage("Id is required"),
    handleInputErrors,
    getNote
)
router.put("/:sectionId/notes/:noteId",
    param("sectionId").isMongoId().withMessage("Id is required"),
    param("noteId").isMongoId().withMessage("Id is required"),
    body("notes").notEmpty().withMessage("Notes are required"),
    handleInputErrors,
    updateNote
)
router.delete("/:sectionId/notes",
    param("sectionId").isMongoId().withMessage("Id is required"),
    handleInputErrors,
    deleteNote
)
export default router;