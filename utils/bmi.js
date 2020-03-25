exports.getBmi = (weight, height) => {
	return (weight / (Math.pow(height / 100, 2))).toFixed(2)
}

exports.getKilosForBmi = (height, bmi) => {
	return (bmi * (Math.pow(height / 100, 2))).toFixed(2)
}

exports.getBmiString = (bmi) => {
	// source: https://en.wikipedia.org/wiki/Body_mass_index
	bmiString = "";
		if (bmi < 15) {
			bmiString =  "Very severely underweight"
		}
		else if (bmi < 16) {
			bmiString =  "Severely underweight"
		}	
		else if (bmi < 18.5) {
			bmiString =  "Underweight"
		}
		else if (bmi < 25) {
			bmiString =  "Normal (healthy weight)"
		}
		else if (bmi < 30) {
			bmiString =  "Overweight"
		}
		else if (bmi < 35) {
			bmiString =  "Moderately obese"
		}
		else if (bmi < 40) {
			bmiString =  "Severely obese"
		}
		else {
			bmiString =  "Very severely obese"
		}

	return bmiString
}

exports.getTargetAction = (bmi) => {
	if (bmi < 18.5) {
		return "gain "
	}
	else if (bmi >= 25) {
		return "lose "
	}
	else {
		return "do nothing"
	}
}

exports.getTargetKilo = (weight, height) => {
	const bmi = this.getBmi(weight, height)
	if (bmi < 18.5) {
		return (this.getKilosForBmi(height, 18.5) - weight).toFixed(2) + ' kg'
	}
	else if (bmi >= 25) {
		return (weight - this.getKilosForBmi(height, 24.9)).toFixed(2) + ' kg'
	}
}