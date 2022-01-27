import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MiddleWare() {
  const { cname } = useParams();
  const navigate = useNavigate();

  const checkCookie = async () => {
    //check for cname in cookie
    // const ci = await fetch("/cookie", {
    //   method: "GET",
    // });
    // if (ci === undefined) {
    // navigate("/");
    // }
    console.log("hi i am middleware");
  };

  useEffect(() => {
    checkCookie();
  }, []);

  return <></>;
}
