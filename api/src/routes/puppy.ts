import express from 'express'
import { getPuppyList, getFilterOptions } from './puppyController'

const router = express.Router()
router.get('/', getPuppyList)
router.get('/filter-options', getFilterOptions)

export default router
