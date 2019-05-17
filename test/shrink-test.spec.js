const jsc = require('jsverify');

/**
 * This test passes UNLESS values includes
 * at least 5 numbers, all of which are at least 10
 */
const test = values => {
  console.log(values);
  if (values.length < 5) {
    return true;
  }
  return values.some(val => val < 10);
};

describe.skip('testing shrinks', () => {
  it('shrinking an array of numbers', () => {
    const property = jsc.forall(jsc.array(jsc.nat), test);
    jsc.assert(property);
  });
});


