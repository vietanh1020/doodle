/* eslint-disable jsx-a11y/img-redundant-alt */
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { login } from "../../hooks/auth/useLogin";
import { userInfo } from "../../utils/atom";

export default function LoginForm() {
  const [, setUser] = useRecoilState(userInfo);
  const navigate = useNavigate();
  const { search } = useLocation();

  const responseMessage = async (response: CredentialResponse) => {
    const res = await login(response);
    if (!res?.user) return toast.error("login failed");
    setUser(res?.user);
    Cookies.set("access_token", res.accessToken);
    localStorage.setItem("user", JSON.stringify(res.user));

    console.log(search.slice(4));

    if (+search.slice(4) > 0) return navigate(`/vote/${search.slice(4)}`);
    navigate("/home");
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
              onError={() => {
                console.log("error");
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
