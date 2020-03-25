const express = require('express')
const router = express.Router()
const bmi = require('../utils/bmi')

router.get('/', function(req, res, next) {
	const weight = parseFloat(req.query.weight)
	const height = parseFloat(req.query.height)
	const calculatedBmi = bmi.getBmi(weight, height)
	res.render('result', {
		weight:weight,
		height:height,
		bmi:calculatedBmi,
		bmiString:bmi.getBmiString(calculatedBmi),
		targetAction:bmi.getTargetAction(calculatedBmi),
		targetKilo:bmi.getTargetKilo(weight, height)
	 })
})

module.exports = router