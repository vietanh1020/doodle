// const console = require("console");
// const axios = require("axios").default;

// describe("delete POLL ", () => {
//   it("success", async () => {
//     try {
//       const access_token =
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjUwMjczMjgxLCJleHAiOjE2NTI4NjUyODF9.7C0DGczYJ-cP8yTicEW-eTmlp12l0hP2A_WohsNFnOY";
//       const response = await axios.delete("http://localhost:3001/poll/21", {
//         headers: {
//           token: `Bearer ${access_token}`,
//         },
//       });
//       expect(response.data.status).toBe(204);
//     } catch (error) {
//       console.log(error.response.data);
//     }
//   });
// });
