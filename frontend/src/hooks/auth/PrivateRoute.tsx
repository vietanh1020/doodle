import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { httpClient } from "../../utils/httpClient";

export function PrivateRoute(props: any) {
  const navigate = useNavigate();

  useEffect(() => {
    httpClient
      .get("/user")
      .then((response: any) => {})
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  return props.children;
}

