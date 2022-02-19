import axios from "axios";
import Cookies from "js-cookie";
import { makeStyles, Button } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

//-----------------------------------------------> custom components
import { MiddleWare } from "../components";
import { BTN_STYLE, SHADOW, COLOR } from "../constants";
import { PrimaryHeader } from "../components/owner";
import { Context } from "../contexts/WidthProvider";
import { OwnerProfile } from "./owners";

export default function OwnerMain() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { width } = useContext(Context);

  //-----------------------------------------------> check is Owner
  useEffect(() => {
    const ux = Cookies.get("ux");
    if (!ux) {
      navigate("/city/signin");
      return;
    }

    const sendRequest = async () => {
      try {
        const res = (await axios.get(`/user/${ux}`)).data;

        // check if user is allowed for bussiness or not
        if (res?.bussinessId) {
          Cookies.set("bx", res.bussinessId);
        } else {
          //-- send request
          navigate("/city/messages");
        }
      } catch (e) {
        navigate("/city/messages");
      }
    };
    sendRequest();
  }, [navigate]);

  //-----------------------------------------------> check width
  useEffect(() => {
    if (width > 700 && pathname === "/city/owner/profile") {
      navigate("/city/owner");
    }

    if (pathname === "/city/owner") {
      navigate("/city/owner/messages");
    }
  }, [width, pathname, navigate]);

  return (
    <>
      <MiddleWare />
      {Cookies.get("bx") ? (
        <>
          <div className={styles.primary}>
            <PrimaryHeader />
            <Button
              onClick={() => {
                navigate("/city/owner/messages");
              }}
              className={styles.btn}
              style={{
                display:
                  width > 700 || pathname === "/city/owner/messages"
                    ? "none"
                    : "flex",
              }}
            >
              <img src="./icons/sms.svg" alt="messages" />
            </Button>

            <Outlet />
          </div>
          <div
            className={styles.secondary}
            style={{ display: width > 700 ? "flex" : "none" }}
          >
            <OwnerProfile />
          </div>
        </>
      ) : (
        <Navigate to="/city/messages" />
      )}
    </>
  );
}

//-----------------------------------------------> custom styles
const useStyles = makeStyles({
  primary: {
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: 280,
    overflowY: "auto",
  },
  btn: {
    ...BTN_STYLE,
    backgroundColor: COLOR.SECONDARY,
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 65,
    height: 65,
    zIndex: 20,
    boxShadow: SHADOW,
    borderRadius: "50%",
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
