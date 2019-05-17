/**
 * Find a zero of the given polynomial near the provided guess
 * https://en.wikipedia.org/wiki/Newton%27s_method
 *
 * @param {Polynomial} polynomial
 * @param {number} guessX
 * @param {number} tolerance how close we need to be to the desired Y value before we stop
 * @param {number} maxIterations how many iterations before we give up and fail
 */
const solve = (polynomial, guessX, tolerance = 0.000001, maxIterations = 1000) => {
  const derivative = polynomial.derivative;
  let iteration = 0;
  let x = guessX;
  let y = polynomial.evaluate(x);
  while(Math.abs(y) > tolerance && iteration < maxIterations) {
    x = x - (polynomial.evaluate(x) / derivative.evaluate(x));
    y = polynomial.evaluate(x);
    iteration++;
  }

  if (Math.abs(y) <= tolerance) {
    return x;
  } else {
    throw new Error(
      `Gave up after ${iteration} iterations. Last approximation: ${x}`
    );
  }
};

module.exports = {
  solve
};
