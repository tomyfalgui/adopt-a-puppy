import express from 'express'
import puppyRoutes from './puppy'

const router = express.Router()
router.use('/puppy', puppyRoutes)

export default router
