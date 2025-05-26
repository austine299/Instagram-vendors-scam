import { Navigate } from "react-router-dom";

const Privacy = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};

export default Privacy;