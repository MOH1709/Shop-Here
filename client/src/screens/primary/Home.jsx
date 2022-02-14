import { makeStyles } from "@material-ui/core";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { OnSwipe } from "../../components";
import { Area } from "../home";

export default function Home() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      <OnSwipe
        onSwipeLeft={() => {
          navigate("/city/cart");
        }}
      />
      {pathname === "/city/home" && <Area />}
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
