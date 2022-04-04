const console = require("console");
const axios = require("axios").default;

describe("delete POLL ", () => {
  it("success", async () => {
    try {
      const access_token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsImlhdCI6MTY0ODUzNDI4MCwiZXhwIjoxNjUxMTI2MjgwfQ.t9Vo7koQvXuZO930K3RH2cl3ThbFwuj91pfbKtJTAlM";
      const response = await axios.delete("http://localhost:3000/poll/21", {
        headers: {
          token: `Bearer ${access_token}`,
        },
      });
      expect(response.data.status).toBe(204);
    } catch (error) {
      console.log(error.response.data);
    }
  });
});
