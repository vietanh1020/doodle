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
      const response = await axios.post("http://localhost:3000/register", data);
      expect(response.data.status).toBe(201);
      expect(response.data.data.email).toBe(data.email);
      expect(response.data.data.firstName).toBe(data.firstName);
      expect(response.data.data.lastName).toBe(data.lastName);
    } catch (error) {
      console.log("Email da ton tai");
      expect(error.response.data.status).toBe(201);
    }
  });
});
