import { useNavigate } from "react-router-dom";

export const usePrivateRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  if (token === null) {
    navigate("/login");
  }
};
