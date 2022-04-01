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
    console.log(response.data)
  });  
});

describe("POST Login falure", () => {
  it("sai pass", async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: "18020172@vnu.edu.vn",
        password: "1234567289",
      })
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  });

  it("sai email ", async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: "180201172@vnu.edu.vn",
        password: "1234567289",
      })
    } catch (err) {
      console.log(err.response.data);
    }
  });

});
