import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import cookie from "js-cookie";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function Home() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { cname } = useParams();

  //-----------------------------------------------> on load
  useEffect(() => {
    // decide default page to navigate
    const defaultPage = async () => {
      try {
        //if found nav to bussiness page
        // else in areas
        const city = cookie.get(cname);
        const ai = cookie.get("ai");

        if (ai) {
          navigate(`/${cname}/home/business`);
        } else if (city) {
          navigate(`/${cname}/home/areas`);
        } else {
          navigate(`/`);
        }
      } catch (e) {
        console.log("error at home");
      }
    };

    defaultPage();
  }, [cname, navigate]);

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
