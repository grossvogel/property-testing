/**
 * A class representing a polynomial
 * Coefficients are stored as an array, with coefficients[i] being the coefficient for x^i
 * so Polynomial.create([1,2,3]) would represent 3x^2 + 2x + 1
 */
class Polynomial {
  /**
   * @param {array} coefficients array of coefficients such that coefficients[i] is the coefficient for X^i
   */
  constructor(coefficients = []) {
    this._coefficients = this._trimCoefficients(coefficients);
  }

  static create(coefficients) {
    return new Polynomial(coefficients);
  }

  static getCoefficients(p) {
    return p.coefficients;
  }

  get coefficients() {
    return this._coefficients;
  }

  get degree() {
    return this.size - 1;
  }

  get size() {
    return this.coefficients.length;
  }

  get derivative() {
    const newCoefficients = this.coefficients
      .map((coefficient, degree) => coefficient * degree)
      .slice(1);
    return new Polynomial(newCoefficients);
  }

  setCoefficient(degree, newValue) {
    const newCoefficients = [...this.coefficients];
    newCoefficients[degree] = newValue;
    return Polynomial.create(newCoefficients);
  }

  toString() {
    if (this.size=== 0) {
      return 'y = 0';
    }
    return `y = ${this.coefficients.map(this._termToString).reverse().join(' + ')}`;
  }

  evaluate(x) {
    return this.coefficients.reduce(this._evalReducer(x), 0);
  }

  _evalReducer(x) {
    return (y, coefficient, power) => y + coefficient * Math.pow(x, power);
  }

  _termToString(coefficient, power) {
    const powerPortion = power ? ` * x^${power}` : '';
    return `${coefficient}${powerPortion}`;
  }

  _trimCoefficients(incomingCoefficients) {
    const coefficients = [...incomingCoefficients];
    while(coefficients[coefficients.length - 1] === 0) {
      coefficients.pop();
    }
    return coefficients;
  }
}

module.exports = Polynomial;
