const rewire = require('rewire')
const assert = require('assert')

const bmi = require('../utils/bmi')
const valid = rewire('../public/javascripts/valid.js')


describe('BMI', function() {
    describe('#getBmi()', function() {
        const expected = 24.69
        it(`should return ${expected} for weight of 80kg and height of 180cm`, function() {
            assert.equal(bmi.getBmi(80, 180), expected)
        })
    })

    describe('#getKilosForBmi()', function() {
        const expected = 80
        it(`should return ${expected} for bmi of 24.69 and height of 180cm`, function() {
            assert.equal(bmi.getKilosForBmi(180, 24.69), expected)
        })
    })

    describe('#getBmiString()', function() {
        const expected_lessThan15 = 'Very severely underweight'
        const expected_lessThan16 = 'Severely underweight'
        const expected_lessThan18_5 = 'Underweight'
        const expected_lessThan25 = 'Normal (healthy weight)'
        const expected_lessThan30 = 'Overweight'
        const expected_lessThan35 = 'Moderately obese'
        const expected_lessThan40 = 'Severely obese'
        const expected_40orBeyond = 'Very severely obese'
        it(`should return ${expected_lessThan15} if bmi < 15`, function() {
            assert.equal(bmi.getBmiString(14.99), expected_lessThan15)
        })
        it(`should return ${expected_lessThan16} if bmi < 16`, function() {
            assert.equal(bmi.getBmiString(15), expected_lessThan16)
            assert.equal(bmi.getBmiString(15.99), expected_lessThan16)
        })
        it(`should return ${expected_lessThan18_5} if bmi < 18.5`, function() {
            assert.equal(bmi.getBmiString(16), expected_lessThan18_5)
            assert.equal(bmi.getBmiString(18.49), expected_lessThan18_5)
        })
        it(`should return ${expected_lessThan25} if bmi < 25`, function() {
            assert.equal(bmi.getBmiString(18.5), expected_lessThan25)
            assert.equal(bmi.getBmiString(24.99), expected_lessThan25)
        })
        it(`should return ${expected_lessThan30} if bmi < 30`, function() {
            assert.equal(bmi.getBmiString(25), expected_lessThan30)
            assert.equal(bmi.getBmiString(29.99), expected_lessThan30)
        })
        it(`should return ${expected_lessThan35} if bmi < 35`, function() {
            assert.equal(bmi.getBmiString(30), expected_lessThan35)
            assert.equal(bmi.getBmiString(34.99), expected_lessThan35)
        })
        it(`should return ${expected_lessThan40} if bmi < 40`, function() {
            assert.equal(bmi.getBmiString(35), expected_lessThan40)
            assert.equal(bmi.getBmiString(39.99), expected_lessThan40)
        })
        it(`should return ${expected_40orBeyond} if bmi >= 40`, function() {
            assert.equal(bmi.getBmiString(40.01), expected_40orBeyond)
        })
    })

    describe('#getTargetAction()', function() {
        const expected_lessThan18_5 = 'gain '
        const expected_normalWeight = 'do nothing'
        const expected_25orBeyond = 'lose '
        it(`should return ${expected_lessThan18_5} if bmi < 18.5`, function() {
            assert.equal(bmi.getTargetAction(18.49), expected_lessThan18_5)
        })
        it(`should return ${expected_normalWeight} if bmi is normal`, function() {
            assert.equal(bmi.getTargetAction(18.5), expected_normalWeight)
            assert.equal(bmi.getTargetAction(24.99), expected_normalWeight)
        })
        it(`should return ${expected_25orBeyond} if bmi is >= 25`, function() {
            assert.equal(bmi.getTargetAction(25.01), expected_25orBeyond)
        })
    })

    describe('#getTargetKilo()', function() {
        const expected_gain = '9.94 kg'
        const expected_lose = '9.32 kg'
        it(`should return ${expected_gain} for weight of 50 and height of 180`, function() {
            assert.equal(bmi.getTargetKilo(50, 180), expected_gain)
        })
        it(`should return ${expected_lose} for weight of 90 and height of 180`, function() {
            assert.equal(bmi.getTargetKilo(90, 180), expected_lose)
        })
    })
})

describe('Validation', function() {
    describe('#isNumber()', function() {
        const isNumber = valid.__get__('isNumber')
        it('1 should be a number', function() {
            assert.equal(isNumber(1), true)
        })
        it('80.6 should be a number', function() {
            assert.equal(isNumber(80.6), true)
        })
        it('empty string should not be a number', function() {
            assert.equal(isNumber(''), false)
        })
        it('"b" should not be a number', function() {
            assert.equal(isNumber('b'), false)
        })
        it('"45r" should not be a number', function() {
            assert.equal(isNumber('45r'), false)
        })
        it('undefined should not be a number', function() {
            assert.equal(isNumber(undefined), false)
        })
        it('NaN should not be a number', function() {
            assert.equal(isNumber(NaN), false)
        })
        it('null should not be a number', function() {
            assert.equal(isNumber(null), false)
        })
    })
})
