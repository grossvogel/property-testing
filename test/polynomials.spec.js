const assert = require('assert');
const jsc = require('jsverify');

const arbitraryPolynomialRaw = require('../arbitraries/polynomial');
const arbitraryPolnomial = jsc.bless(arbitraryPolynomialRaw);
const Polynomial = require('../polynomial');
const newton = require('../newtons-method');

const approxEqual = (a, b, precision = 0.000001) => Math.abs(a - b) < precision;

describe('polynomials', () => {
  describe('newton\'s method', () => {
    // example-based test
    it('solves y = x^2 - 1 and a guess of 2', () => {
      const p = new Polynomial([-1, 0, 1]);
      const solution = newton.solve(p, 2);

      const expected = 1;
      assert(approxEqual(solution, expected));
    });

    // property-based test
    it('solves polynomial functions from a guess within 0.5', () => {
      const solvesPolynomialFunctions = jsc.forall(arbitraryPolnomial, jsc.integer(10), (originalP, x) => {
        if (originalP.degree <= 0) {
          return true; // no fun solving constant functions
        };

        // originalP(x) = y... we make p such that p(x) = 0
        const y = originalP.evaluate(x);
        const p = originalP.setCoefficient(0, originalP.coefficients[0] - y);

        // make a random guess within 0.5 of the right answer, and use it to solve
        const delta = jsc.random.number(-0.5, 0.5);
        const solution = newton.solve(p, x + delta);
        return approxEqual(originalP.evaluate(solution), y);
      });

      // use size: 1024 if using the arbitrary created by smap-ing an int array
      jsc.assert(solvesPolynomialFunctions, { size: 10 });
    });
  });
});


