import { makeStyles, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function Setting({ setLocation }) {
  const styles = useStyles();
  const navigate = useNavigate();

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
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: 0,
    height: "100vh",
    width: "100%",
    backgroundColor: "white",
    zIndex: 999,
  },
});
