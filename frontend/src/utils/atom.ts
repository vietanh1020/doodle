import { atom } from "recoil";

const localUser = JSON.parse(localStorage.getItem("user") || "");

export const userInfo = atom({
  key: "userInfo",
  default: {
    email: localUser.email,
    firstName: localUser.firstName,
    lastName: localUser.lastName,
    avata: localUser.avata,
  },
});
