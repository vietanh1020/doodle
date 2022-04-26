import axios from "axios";
import { useState } from "react";

function RegisterForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: any) => {
    setData((prev: any) => {
      const { id, value } = e.target;
      return { ...prev, [id]: value };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/register", data);
      if (response) {
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  try {
  } catch (error) {}

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100 pb-3" style={{maxWidth:'960px'}} >
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="email"
                  value={data.email}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                />
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
              </div>

              <div className="row">
                <div className="col form-outline mb-4">
                  <input
                    type="firstName"
                    id="firstName"
                    value={data.firstName}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="firstName">
                    Tên
                  </label>
                </div>

                <div className="col form-outline mb-4">
                  <input
                    type="lastName"
                    id="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="lastName">
                    Họ
                  </label>
                </div>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                />
                <label className="form-label" htmlFor="password">
                  Mật khẩu
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                onClick={handleSubmit}
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
