import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const user = localStorage.getItem("accessToken");
  const handleLogOut = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    axios.post("http://localhost:3001/poll", {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");

    const navigate = useNavigate();
    navigate("/login");
  };

  return (
    <button className="btn btn-primary" onClick={handleLogOut}>
      Đăng xuất
    </button>
  );
}

export default LogOut;
