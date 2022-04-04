const console = require("console");
const axios = require("axios").default;

describe("delete POLL ", () => {
  it("success", async () => {
    try {
      const response = await axios.delete("http://localhost:3000/poll/21", {
        headers: {
          token: `Bearer ${access_token}`,
        },
      });

      expect(response.data.status).toBe(204);
    } catch (error) {
      expect(error.response.data.status).toBe(400);
      console.log(error.response.data);
    }
  });
});
