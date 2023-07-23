import { atom } from "recoil";

const user = localStorage.getItem("user");

const localUser = !!user
  ? JSON.parse(user)
  : {
      email: "",
      firstName: "",
      lastName: "",
      avata: "",
    };

export const userInfo = atom({
  key: "userInfo",
  default: {
    email: localUser.email,
    firstName: localUser.firstName,
    lastName: localUser.lastName,
    avata: localUser.avata,
  },
});

export const autoFetch = atom({
  key: "autoFetch",
  default: false,
});
