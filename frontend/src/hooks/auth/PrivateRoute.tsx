import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("access_token");
export function PrivateRoute(props: any) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/login");
  }, []);
  return props.children;
}
