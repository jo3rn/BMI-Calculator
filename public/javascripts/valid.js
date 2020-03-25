const validate = () => {
    const form = document.getElementById('formBmi')
    const weight = parseFloat(form.weight.value)
    if (!isNumber(weight)) {
        alert("Your weight must be a number.")
        return false
    } else {
        const height = parseFloat(form.height.value)
        if (!isNumber(height)) {
            alert("Your height must be a number.")
            return false
        }
    }
    return true
}

const isNumber = (input) => {
    return (!isNaN(input) && typeof input === 'number')
}