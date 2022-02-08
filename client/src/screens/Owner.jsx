import axios from "axios";
import Cookies from "js-cookie";
import { makeStyles } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

//-----------------------------------------------> custom components
import { MiddleWare } from "../components";
import { PrimaryHeader } from "../components/owner";
import { Context } from "../contexts/WidthProvider";
import { OwnerHome } from "./owners";

export default function Owner() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { width } = useContext(Context);

  useEffect(() => {
    const ux = Cookies.get("ux");
    if (!ux) {
      navigate("/city/signin");
      return;
    }

    const sendRequest = async () => {
      try {
        const { data } = await axios.get(`/user/${ux}`);
        if (data?.bussinessId) {
          Cookies.set("bx", data.bussinessId);
        } else {
          //send request
          navigate("/city/messages");
        }
      } catch (e) {
        navigate("/city/messages");
        alert("error in owner login");
      }
    };
    sendRequest();
  }, [navigate]);

  return (
    <>
      <MiddleWare />
      {Cookies.get("bx") ? (
        <>
          <div className={styles.primary}>
            <PrimaryHeader />
            <Outlet />
          </div>
          <div
            className={styles.secondary}
            style={{ display: width > 700 ? "flex" : "none" }}
          >
            <OwnerHome />
          </div>
        </>
      ) : (
        <Navigate to="/city/messages" />
      )}
    </>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  primary: {
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: 280,
    overflowY: "auto",
  },
  secondary: {
    flex: 2,
    overflowY: "auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    borderLeft: "1px solid black",
  },
});
