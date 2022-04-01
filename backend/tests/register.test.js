const console = require("console");

const axios = require("axios").default;

describe("POST Register success ", () => {
  it("Register success", async () => {
    const response = await axios.post("http://localhost:3000/register", {
      email: "thaoy.xt@vnu.edu.vn",
      firstName: "Thảo",
      lastName: "Xã Thu",
      password: "123456789",
    });
    expect(response.data.status).toBe(201);
  });
});

