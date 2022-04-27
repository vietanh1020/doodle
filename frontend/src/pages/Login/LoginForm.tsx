import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { UseLogin } from "../../hooks/auth/useLogin";

const schema = yup.object().shape({
  email: yup.string().required("Vui lòng nhập email").email(),

  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onLoginSubmit = async (data: any) => {
    const response = await UseLogin(data);

    if (!response.error) {
      localStorage.setItem("access_token", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.newUser));
      navigate("/poll");
    } else {
      alert(response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onLoginSubmit)}>
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
              <div className="form-outline mb-4">
                <label htmlFor="email">Email: </label>
                <input
                  id="email"
                  className=" form-control form-control-lg"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="message-error">{errors.email?.message}</p>
                )}
              </div>

              <div className="form-outline mb-4">
                <label htmlFor="password">Mật khẩu: </label>
                <input
                  id="password"
                  type="password"
                  className=" form-control form-control-lg"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="message-error">{errors.password?.message}</p>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
