const console = require("console");
const axios = require("axios").default;

describe("POST Create POLL ", () => {
  it("success", async () => {
    try {
      const access_token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjUwMjczMjgxLCJleHAiOjE2NTI4NjUyODF9.7C0DGczYJ-cP8yTicEW-eTmlp12l0hP2A_WohsNFnOY";
      const data = {
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

      const response = await axios.post("http://localhost:3001/poll", {
        headers: {
          token: `Bearer ${access_token}`
        },
        data
      });

      expect(response.data.status).toBe(201);
      expect(response.data.data.question).toBe(data.question);
      expect(response.data.data.image).toBe(data.image);
      expect(response.data.data.description).toBe(data.description);
      expect(response.data.data.address).toBe(data.address);
      expect(response.data.data.map).toBe(data.map);
      expect(response.data.data.startAt).toBe(data.startAt);
      expect(response.data.data.endAt).toBe(data.endAt);
      expect(response.data.data.answers).toBe(data.answers);
      expect(response.data.data.multipleVote).toBe(data.multipleVote);
      console.log(response.data);
    } catch (error) {
      expect(error.response.data.status).toBe(401);
      console.log(error.response.data);
    }
  });

  it("failure", async () => {
    try {
      const access_token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjUwMjc2Mjc1LCJleHAiOjE2NTI4NjgyNzV9.ZTwf6cwQGTUD_qEN_GWjF2c8z6dDKJpHK7a2n0UnVgw";
      const data = {
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

      const response = await axios.post("http://localhost:3001/poll", {
        headers: {
          token: `Bearer ${access_token}`
        },
        data
      });

      expect(response.data.status).toBe(201);
      expect(response.data.data.question).toBe(data.question);
      expect(response.data.data.image).toBe(data.image);
      expect(response.data.data.description).toBe(data.description);
      expect(response.data.data.address).toBe(data.address);
      expect(response.data.data.map).toBe(data.map);
      expect(response.data.data.startAt).toBe(data.startAt);
      expect(response.data.data.endAt).toBe(data.endAt);
      expect(response.data.data.answers).toBe(data.answers);
      expect(response.data.data.multipleVote).toBe(data.multipleVote);
      console.log(response.data);
    } catch (error) {
      expect(error.response.data.status).toBe(401);
      console.log(error.response.data);
    }
  });
});
