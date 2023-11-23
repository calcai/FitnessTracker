const express = require('express')
const { 
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
 } = require('../controllers/workoutController')

const router = express.Router()

//Get workouts
router.get('/', getWorkouts)

//Get single workout
router.get('/:id', getWorkout)

//post new workout
router.post('/', createWorkout)

//delete a workout
router.delete('/:id', deleteWorkout)

//update a workout
router.patch('/:id', updateWorkout)

module.exports = router