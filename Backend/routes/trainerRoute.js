import express from 'express'
import { addTrainer, getTrainerById, getTrainerList } from '../controllers/trainerController.js'

const router = express.Router();

router.post('/add',addTrainer)

router.get('/list', getTrainerList)

router.get('/:id',getTrainerById)

//router.post('/book', bookSession)

export default router