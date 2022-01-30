import cookie from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MiddleWare() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookie.get("ci")) {
      navigate("/");
    }
  }, [navigate]);

  return <></>;
}
