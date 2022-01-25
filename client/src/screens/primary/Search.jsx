import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import { COLOR, FLEX_CENTER } from "../../constants";

export default function Search() {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.inputDiv}>
          <input type="text" placeholder="product name" />
          <span className={styles.icon}>
            <img src="./icons/search.svg" alt="search" height="20" />
          </span>
        </div>
        <span
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src="./icons/backArrow.svg" alt="back" />
        </span>
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
    "& span": {
      ...FLEX_CENTER,
      padding: 5,
      borderRadius: "50%",
      border: "2px solid white",
      cursor: "pointer",
    },

    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    paddingLeft: 10,
    backgroundColor: COLOR.PRIMARY,
    color: COLOR.SECONDARY,
  },
  inputDiv: {
    "& input": {
      flex: 1,
      letterSpacing: 1,
      paddingInline: 10,
      borderRadius: 5,
      border: "none",
      outline: "none",
    },
    "& span": {
      marginBlock: "auto",
      height: "100%",
      borderRadius: 5,
      backgroundColor: COLOR.PRIMARY,
    },
    flex: 1,

    display: "flex",
    backgroundColor: "white",
    marginRight: 10,
  },
});
