import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const styles = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const isSignedIn = async () => {
      try {
        const ux = cookie.get("ux");
        if (ux) {
          const res = await axios.get(`/city/${ux}/user`);
          if (res.data) {
          }
        } else {
          navigate(`/city/signin`);
        }
      } catch (e) {
        console.log("error in profile");
      }
    };

    isSignedIn();
  }, [navigate]);

  return <div className={styles.container}>Profile</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
