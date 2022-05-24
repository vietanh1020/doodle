import { useNavigate } from "react-router-dom";
import { httpClient } from "../../utils/httpClient";

export function NavBar() {
  const { REACT_APP_API_URL = "http://localhost:3001" } = process.env;

  const navigate = useNavigate();
  const handleAddPoll = () => {
    navigate("/poll");
  };

  const handleRedirect = (e: any) => {
    navigate("/home");
  };

  const handleLogOut = async (e: any) => {
    e.preventDefault();
    const response = await httpClient.post(`/logout`, {});
    if (response) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      localStorage.removeItem("isVoted");
      navigate("/login");
    }
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          <h1 onClick={handleRedirect}>DOODLE</h1>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="#"
                onClick={handleAddPoll}
              >
                Create +
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {`${user.firstName} ${user.lastName}`}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Cài đặt
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Đóng góp
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" onClick={handleLogOut} href="#">
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
