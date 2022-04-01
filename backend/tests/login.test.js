const console = require("console");

const axios = require("axios").default;

describe("POST Login success ", () => {
  it("Login success", async () => {
    const response = await axios.post("http://localhost:3000/login", {
      email: "18020172@vnu.edu.vn",
      password: "123456789",
    });
    expect(response.data.status).toBe(200);
  });

  it("Login success va user", async () => {
    const response = await axios.post("http://localhost:3000/login", {
      email: "anh.vv@zinza.com.vn",
      password: "123456789",
    });
    expect(response.data.status).toBe(200);
  });  
});

describe("POST Login falure", () => {
  it("sai pass", async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: "18020172@vnu.edu.vn",
        password: "1234567289",
      })
    } catch (err) {
      expect(err.response.data.status).toBe(401)
    }
  });

  it("sai email ", async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: "180201172@vnu.edu.vn",
        password: "1234567289",
      })
    } catch (err) {
      expect(err.response.data.status).toBe(401)
    }
  });

});
