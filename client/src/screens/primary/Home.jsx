import { makeStyles } from "@material-ui/core";
import { Outlet, useLocation } from "react-router-dom";
import { Area } from "../home";

export default function Home() {
  const styles = useStyles();
  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
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
