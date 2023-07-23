import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { httpClient } from "../../utils/httpClient";

export function PrivateRoute(props: any) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    httpClient
      .get("/user")
      .then((response: any) => {})
      .catch((error) => {
        navigate(
          pathname.includes("/vote")
            ? `/login?id=${pathname.slice(6)}`
            : "/login"
        );
      });
  }, []);

  return props.children;
}
