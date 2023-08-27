import express from 'express'
import { getPuppyList } from './puppyController';


const router = express.Router()
router.get('/', getPuppyList)

export default router