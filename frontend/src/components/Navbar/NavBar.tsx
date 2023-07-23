/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import { Avatar, Box } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../utils/atom";
import { httpClient } from "../../utils/httpClient";

export function NavBar() {
  const navigate = useNavigate();
  const handleAddPoll = () => {
    navigate("/poll");
  };

  const handleRedirect = (e: any) => {
    navigate("/home");
  };

  const handleLogOut = async (e: any) => {
    e.preventDefault();
    await httpClient.post(`/logout`, {});
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("isVoted");
    navigate("/login");
  };

  const user = useRecoilValue(userInfo);

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
                Create new poll
              </a>
            </li>

            <li className="nav-item dropdown">
              <p
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* <Avatar alt="Remy Sharp" src={user.avata} /> */}
                <span> {`${user.firstName} ${user.lastName}`}</span>
              </p>
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
