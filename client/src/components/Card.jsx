import { makeStyles, Button } from "@material-ui/core";
import { FLEX_CENTER, COLOR } from "../constants";

export default function Card({ img, title, content, onClickHandler }) {
  const styles = useStyles();

  return (
    <Button className={styles.container} onClick={onClickHandler}>
      <div className={styles.img}>
        <img src={img || "./logo.png"} alt="img" />
      </div>
      <div className={styles.contentDiv}>
        <p>{title}</p>
        <div>{content}</div>
      </div>
    </Button>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    "& :hover": {
      color: COLOR.SECONDARY,
    },
    position: "relative",
    display: "flex",
    width: "100%",
    textAlign: "left",
    padding: 10,
    paddingLeft: 0,
    marginBlock: 10,
    cursor: "pointer",
  },
  img: {
    "& img": {
      width: 60,
      height: 60,
      objectFit: "cover",
      borderRadius: "50%",
    },
    ...FLEX_CENTER,
    width: "30%",
    maxWidth: 100,
    minWidth: 80,
  },
  contentDiv: {
    "& :first-child": {
      width: "90%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",

      fontWeight: 500,
      fontSize: 13,
    },
    "& :nth-child(2)": {
      fontSize: 10,
      letterSpacing: -0.2,
      textTransform: "lowercase",
      width: "90%",
      height: "3em",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: "rgba(0,0,0,0.5)",
    },
    flex: 1,
    overflow: "hidden",
    borderBottom: "2px solid rgba(0,0,0,0.5)",
  },
});
