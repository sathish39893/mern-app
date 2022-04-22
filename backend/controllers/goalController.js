const asyncHanlder = require('express-async-handler')
const Goal = require('../models/goalModel')
// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHanlder( async (req,res) =>{
    const goals = await Goal.find()
    res.status(200).json(goals);
});

// @desc Set Goals
// @route POST /api/goals
// @access Private
const setGoals = asyncHanlder( async (req,res) =>{

    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text:req.body.text
    })

    res.status(200).json(goal)
});

// @desc Update Goal
// @route PUT /api/goals
// @access Private
const updateGoal = asyncHanlder( async (req,res) =>{

    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{ new:true })

    res.status(200).json(updatedGoal)
});

// @desc Delete Goal
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHanlder( async (req,res) =>{

    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const deletedGoal = await Goal.findByIdAndDelete(req.params.id,)

    res.status(200).json(deletedGoal)
});


module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}