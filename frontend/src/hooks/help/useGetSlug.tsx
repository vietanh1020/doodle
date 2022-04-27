import { useLocation } from "react-router-dom";

export const useGetSlug = () => {
  const location = useLocation();
  const vt = location.pathname.lastIndexOf("/") + 1;
  return location.pathname.substring(vt, location.pathname.length);
};
