import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const { SERVER_URL = "http://localhost:3001" } = process.env;

  const onLoginSubmit = async (data: any) => {
    try {
      const response = await axios.post(`${SERVER_URL}/login`, data);
      if (response) {
        navigate("/poll", { state: response.data.data.accessToken });
      }
    } catch (error: any) {
      alert(error.response.data.message);
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
