'use strict'
const RandomRead = require('./read-generator')

const reads = new RandomRead({
  heartRate: 35,
  respiratoryRate: 15,
  temperatureAir: 15,
  temperatureBody: 36,
  motion: 'WALK'
})

const results = []

const max = 100

for (let i = 0; i < max; i++) {
  results.push(reads.generate())
  console.log(results[i])
}
