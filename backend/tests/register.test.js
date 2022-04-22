const console = require("console");

const axios = require("axios").default;

describe("POST Register success ", () => {
  it("Register success", async () => {
    try {
      const data = {
        email: "thao.xt@mail.com",
        firstName: "Thảo",
        lastName: "Xã Thu",
        password: "123456789",
      };
      const response = await axios.post("http://localhost:3001/register", data);
      expect(response.data.status).toBe(201);
      expect(response.data.data.email).toBe(data.email);
      expect(response.data.data.firstName).toBe(data.firstName);
      expect(response.data.data.lastName).toBe(data.lastName);
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data);
    }
  });
});
