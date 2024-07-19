import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedCheckout({ children }) {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart"));
  useEffect(() => {
    if (cart?.length === 0) {
      navigate("/");
    }
  }, [cart?.length, navigate]);

  return cart?.length > 0 ? children : null;
}
