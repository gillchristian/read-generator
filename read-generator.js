'use strict'

class RandomRead {
  constructor(params) {
    this.tendencies = {
      heartRate: this.tendency(),
      respiratoryRate: this.tendency(),
      temperatureAir: this.tendency(),
      temperatureBody: this.tendency(),
      motion: this.tendency()
    }

    this.nextValueFor('heartRate', params.heartRate)
    this.nextValueFor('respiratoryRate', params.respiratoryRate)
    this.nextValueFor('temperatureBody', params.temperatureBody)
    this.nextValueFor('temperatureAir', params.temperatureAir)
    this.nextMotion(params.motion)
  }

  /**
   * Generate read
   */
  generate() {
    return {
      date: new Date(),
      heartRate: this.nextValueFor('heartRate'),
      respiratoryRate: this.nextValueFor('respiratoryRate'),
      temperatureBody: this.nextValueFor('temperatureBody'),
      temperatureAir: this.nextValueFor('temperatureAir'),
      motion: this.nextMotion()
    }
  }

  /**
   * Generates a not so random value for the specified property
   *
   * @param {String}  property
   * @param {Number?}  previous value
   * @returns {Number}  random value
   */
  nextValueFor(property, previous) {
    const range = {min: 28, max: 44}
    this[property] = this.numberInRange(
      previous || this[property],
      range,
      this.tendencies[property].increase
    )
    this.tendencies[property].times--
    if (this.tendencies[property].times <= 0) {
      this.tendencies[property] = this.tendency()
    }
    return this[property]
  }

  /**
   * Generates a not so random motion state
   *
   * @returns {string?}  previous motion state
   * @returns {string}  motion state
   */
  nextMotion(previous) {
    const states = ['STATIONARY', 'WALK', 'RUN']
    if (this.tendencies.motion.times) {
      this.tendencies.motion.times--
      this.motion = previous || this.motion
    } else {
      this.tendencies.motion = this.tendency()
      this.motion = states[Math.floor((Math.random() * (3)) + 1) - 1]
    }
    return this.motion
  }

  /**
   * Generates a number inside a range
   *
   * @param {Number}  previous value
   * @param {Object}  min and max values
   * @param {Boolean?}  tendency to increase or decrease value
   * @param {Number?}  factor to variate from the previous value
   * @returns {Number}  random value
   */
  numberInRange(previous, range, tendency, deltaFactor = 0.1) {
    const factor = tendency ? 1 : -1
    const delta = Math.random() * previous * deltaFactor * factor
    const result = previous + delta
    if (result > range.max) {
      return range.max
    }
    if (result < range.min) {
      return range.min
    }
    return result
  }

  /**
   * Generates a tendency for a value to change
   */
  tendency() {
    return {
      increase: Boolean(Math.floor(Math.random() * 2)),
      times: Math.floor(Math.random() * 10)
    }
  }
}

module.exports = RandomRead
