import axios from "axios";
import { useNavigate } from "react-router-dom";
import { httpClient } from "../../utils/httpClient";

function LogOut() {
  const navigate = useNavigate()

  const handleLogOut = async(e: any) => {
    e.preventDefault();
    const response = await httpClient.post(`/logout`, {});
    if (response){
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleLogOut}>
      Đăng xuất
    </button>
  );
}

export default LogOut;
