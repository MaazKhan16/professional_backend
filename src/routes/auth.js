import {Router} from "express"
import { createUser } from "../controllers/authController.js"
import { createVideo } from "../controllers/authController.js"


const router = Router()

router.post('/usersignup', createUser)
router.post('/videosignup', createVideo)

export {router}