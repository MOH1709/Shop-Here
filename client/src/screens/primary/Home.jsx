import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import cookie from "js-cookie";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function Home() {
  const styles = useStyles();
  const { bid } = useParams();
  const navigate = useNavigate();

  //-----------------------------------------------> on load
  useEffect(() => {
    // decide default page to navigate

    const ai = cookie.get("ai");

    if (bid) {
      navigate(`/city/home/${bid}`);
    } else if (ai) {
      navigate(`/city/home/businesses`);
    } else {
      navigate(`/city/home/areas`);
    }
  }, [navigate, bid]);

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
