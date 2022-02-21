import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------> custom components
import { COLOR, FLEX_CENTER } from "../../constants";

export default function Search() {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.inputDiv}>
          <span
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src="./icons/backArrow.svg" alt="back" />
          </span>
          <input type="text" placeholder="product name" autoFocus={true} />
          <span className={styles.icon}>
            <img src="./icons/search.svg" alt="search" height="20" />
          </span>
        </div>
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
    zIndex: 999,
  },
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: 10,
    paddingBlock: 20,
    backgroundColor: COLOR.PRIMARY,
    color: COLOR.SECONDARY,
  },
  inputDiv: {
    "& input": {
      flex: 1,
      width: 50,
      letterSpacing: 0.5,
      paddingInline: 5,
      border: "none",
      outline: "none",
    },
    "& span": {
      ...FLEX_CENTER,
      width: 40,
      height: 40,
      borderRadius: 5,
      backgroundColor: COLOR.PRIMARY,
      cursor: "pointer",
    },
    flex: 1,
    display: "flex",
    alignItems: "center",
    padding: 3,
    height: 46,
    borderRadius: 5,
    backgroundColor: "white",
  },
});
