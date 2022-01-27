import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function Home() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { cname } = useParams();

  //-----------------------------------------------> check for ai in cookie
  const checkAi = () => {
    //if found nav to bussiness page
    // else in areas
    navigate(`/${cname}/home/areas`);
  };

  useEffect(() => {
    checkAi();
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
