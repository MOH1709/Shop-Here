import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import cookie from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";

export default function Home() {
  const styles = useStyles();
  const navigate = useNavigate();

  //-----------------------------------------------> on load
  useEffect(() => {
    // decide default page to navigate

    const ci = cookie.get("ci");
    const ai = cookie.get("ai");

    if (ai) {
      navigate(`/city/home/businesses`);
    } else if (ci) {
      navigate(`/city/home/areas`);
    } else {
      navigate(`/`);
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
