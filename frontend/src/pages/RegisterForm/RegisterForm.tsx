import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { UseRegister } from "../../hooks/auth/useRegister";

const schema = yup.object().shape({
  email: yup.string()

  
});

function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: any) => {
    const response = await UseRegister(data);

    if (!response.error) {
      navigate("/login");
    } else {
      alert(response.message);
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div
          className="row d-flex align-items-center justify-content-center h-100 pb-3"
          style={{ maxWidth: "960px" }}
        >
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="message-error">{errors.email?.message}</p>
                )}
              </div>

              <div className="row">
                <div className="col form-outline mb-4">
                  <label className="form-label" htmlFor="firstName">
                    Tên
                  </label>
                  <input
                    type="firstName"
                    id="firstName"
                    {...register("firstName")}
                    className="form-control form-control-lg"
                  />
                  {errors.firstName && (
                    <p className="message-error">{errors.firstName?.message}</p>
                  )}
                </div>

                <div className="col form-outline mb-4">
                  <label className="form-label" htmlFor="lastName">
                    Họ
                  </label>
                  <input
                    type="lastName"
                    id="lastName"
                    {...register("lastName")}
                    className="form-control form-control-lg"
                  />
                  {errors.lastName && (
                    <p className="message-error">{errors.lastName?.message}</p>
                  )}
                </div>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="form-control form-control-lg"
                />
                {errors.password && (
                  <p className="message-error">{errors.password?.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Tạo tài khoản
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;
