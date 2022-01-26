import { makeStyles, Button } from "@material-ui/core";
import { NavLink, useNavigate, Outlet, useParams } from "react-router-dom";

import { COLOR } from "../../constants";

export default function Setting() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { cityid } = useParams();

  const logOut = () => {
    navigate(`/`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>Settings</p>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src="./icons/backArrow.svg" alt="back" />
        </Button>
      </div>
      <div className={styles.main}>
        <Button
          className={styles.navBtn}
          component={NavLink}
          to={`/${cityid}/setting/userprofile`}
        >
          My Profile
        </Button>
        <Button
          className={styles.navBtn}
          component={NavLink}
          to={`/${cityid}/setting/userbills`}
        >
          My Orders
        </Button>
        <Button
          className={styles.navBtn}
          component={NavLink}
          to={`/${cityid}/setting/ownersignin`}
        >
          Be Seller
        </Button>
        <Button
          className={styles.navBtn}
          component={NavLink}
          to={`/${cityid}/setting/updates`}
        >
          Update & Info
        </Button>
        {/* <Button
          className={styles.navBtn}
          component={NavLink}
          to={`/${cityid}/setting/`}
        >
          Want A Product
        </Button> */}
        <Button
          className={styles.navBtn}
          component={NavLink}
          to={`/${cityid}/setting/report`}
        >
          Report An Issue
        </Button>
        <Button className={styles.navBtn} onClick={logOut}>
          Log Out
        </Button>
        <Outlet />
      </div>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: 0,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    backgroundColor: "white",
    zIndex: 20,
  },
  header: {
    "& p": {
      fontSize: 25,
      fontWeight: "bold",
    },
    "& Button": {
      borderRadius: 5,
      border: "2px solid white",
    },

    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    paddingRight: 10,
    backgroundColor: COLOR.PRIMARY,
    color: COLOR.SECONDARY,
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 20,
    overflowY: "auto",
  },
  navBtn: {
    height: 50,
    borderRadius: 0,
    fontWeight: "bold",
    marginBlock: 5,
    borderBottom: "2px solid rgba(0,0,0,0.5)",
  },
});
