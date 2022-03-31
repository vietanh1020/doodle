// const axios = require("axios").default;

// axios
//   .get("http://localhost:3000/vietanh")
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })


const MathJS = require('../src/math');

it('Adds 1 + 1 to equals 2', () => {
  expect(MathJS.sum(1, 1)).toBe(2);
});
