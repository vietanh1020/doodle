const console = require("console");
const axios = require("axios").default;

describe("POST /poll --- Create POLL ", () => {
  const inputData = {
    question: "thao.xt@mail.com",
    image: "Thảo",
    description: "Xã Thu",
    address: "Nghệ An",
    map: "link",
    startAt: "2022-04-30T06:42:28.062Z",
    endAt: "2022-05-30T06:42:28.062Z",
    answers: `{"op1":"viet anh","op2":"thao","op3":"hoa","op4":"lan"}`,
    multipleVote: true,
  };

  it("Valid input data", async () => {
    try {
      const access_token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjUwMjczMjgxLCJleHAiOjE2NTI4NjUyODF9.7C0DGczYJ-cP8yTicEW-eTmlp12l0hP2A_WohsNFnOY";

      const response = await axios.post("http://localhost:3001/poll", {
        headers: {
          token: `Bearer ${access_token}`,
        },
        data: inputData,
      });

      const body = response.data;

      expect(body.status).toBe(201);
      expect(body.data.question).toBe(inputData.question);
      expect(body.data.image).toBe(inputData.image);
      expect(body.data.description).toBe(inputData.description);
      expect(body.data.address).toBe(inputData.address);
      expect(body.data.map).toBe(inputData.map);
      expect(body.data.startAt).toBe(inputData.startAt);
      expect(body.data.endAt).toBe(inputData.endAt);
      expect(body.data.answers).toBe(inputData.answers);
      expect(body.data.multipleVote).toBe(inputData.multipleVote);
      console.log(response.data);
    } catch (error) {
      expect(error.body.status).toBe(401);
      console.log(error.response.data);
    }
  });

  it("Invalid input data", async () => {
    try {
      const access_token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjUwMjc2Mjc1LCJleHAiOjE2NTI4NjgyNzV9.ZTwf6cwQGTUD_qEN_GWjF2c8z6dDKJpHK7a2n0UnVgw";

      const response = await axios.post("http://localhost:3001/poll", {
        headers: {
          token: `Bearer ${access_token}`,
        },
        data: {
          ...inputData,
          startAt: "2022-04-30T06:42:28.062Z",
          endAt: "2022-05-30T06:42:28.062Z",
        },
      });

      const body = response.data;

      expect(body.status).toBe(201);
      expect(body.data.question).toBe(inputData.question);
      expect(body.data.image).toBe(inputData.image);
      expect(body.data.description).toBe(inputData.description);
      expect(body.data.address).toBe(inputData.address);
      expect(body.data.map).toBe(inputData.map);
      expect(body.data.startAt).toBe(inputData.startAt);
      expect(body.data.endAt).toBe(inputData.endAt);
      expect(body.data.answers).toBe(inputData.answers);
      expect(body.data.multipleVote).toBe(inputData.multipleVote);
    } catch (error) {
      expect(error.body.status).toBe(401);
      console.log(error.response.data);
    }
  });
});
