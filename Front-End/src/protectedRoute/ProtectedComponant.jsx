import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedComponant({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  return user ? children : null;
}