const jsc = require('jsverify');

const Polynomial = require('../polynomial');

const MAX_COEFFICIENT = 50;

/**
 * Size in the case of polynomials will be the degree + 1
 * For simplicity, coefficients are integers
 * @param {Integer} size
 */
const generator = size => {
  const coefficients = [];
  for (i = 0; i < size; i++) {
    coefficients.push(jsc.random(-MAX_COEFFICIENT, MAX_COEFFICIENT));
  }
  return new Polynomial(coefficients);
};

const show = p => p.toString();

const shrink = p => {
  const arrayShrinker = jsc.shrink.array;
  const arrayIntShrinker = arrayShrinker(jsc.integer.shrink);
  const coefficientSets = arrayIntShrinker(p.coefficients);
  return coefficientSets.map(Polynomial.create);
};

module.exports = {
  generator,
  show,
  shrink,
};

/**
 * Alternatively, we could just construct our polynomial arbitrary using the
 * built-in array and integer arbitraries, along with smap
 *
 * The main difference is that the _SIZE_ for the built-in array arbitrary is logarithmic (base 2)
 * so to get polynomials with degree 9 or less we'd use size: 1024
 */
// const boundedInt = jsc.integer(-MAX_COEFFICIENT, MAX_COEFFICIENT);
// module.exports = jsc.nearray(boundedInt).smap(Polynomial.create, Polynomial.getCoefficents);
