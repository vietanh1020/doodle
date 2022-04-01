const console = require("console");

const axios = require("axios").default;

describe("get poll success ", () => {
  it("get poll by id", async () => {
  
    try {
      const access_token =
        "1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsImlhdCI6MTY0ODUzNDI4MCwiZXhwIjoxNjUxMTI2MjgwfQ.t9Vo7koQvXuZO930K3RH2cl3ThbFwuj91pfbKtJTAlM";
      const response = await axios.get("http://localhost:3000/poll", {
        headers: {
          token: `Bearer ${access_token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data)
    }
  });

});
