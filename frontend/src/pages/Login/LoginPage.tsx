import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { atom, useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { UseLogin } from "../../hooks/auth/useLogin";

export const userAtom = atom({
  refreshToken: null,
  accessToken: null,
  newUser: { firstName: null, lastName: null },
});

export default function LoginForm() {
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const responseMessage = (response: CredentialResponse) => {
    console.log(response);
  };
  const errorMessage = () => {
    console.log("error");
  };

  const onLoginSubmit = async (data: any) => {
    const response = await UseLogin(data);
    localStorage.setItem("user", JSON.stringify(response.user));
    if (!!response.accessToken) {
      setUser({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        newUser: response.newUser,
      });
      navigate("/home");
    } else {
      alert(response.message);
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>

          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <GoogleLogin
              size="large"
              shape="circle"
              onSuccess={responseMessage}
              onError={errorMessage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
