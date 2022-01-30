import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import cookie from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";

export default function Home() {
  const styles = useStyles();
  const navigate = useNavigate();

  //-----------------------------------------------> on load default page
  useEffect(() => {
    if (cookie.get("ai")) {
      navigate("/city/home/businesses");
    } else {
      navigate("/city/home/areas");
    }
  }, []);

  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    flex: 1,
    position: "relative",
    overflowY: "auto",
  },
});
