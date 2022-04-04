const console = require("console");
const axios = require("axios").default;

describe("POST Create vote ", () => {
  it("success", async () => {
    try {
      const data = {
        fullName: "Vo Viet Anh",
        answer: `{"op1":"viet anh","op3":"hoa"}`,
      };

      const response = await axios.post(
        "http://localhost:3000/vote_poll/49/voted",
        data
      );

      expect(response.data.status).toBe(201);
      console.log(response.data);
    } catch (error) {
      console.log("vote error");
      console.log(error.response.data);
    }
  });
});
