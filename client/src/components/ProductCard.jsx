import { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import { COLOR, FLEX_CENTER } from "../constants";

export default function Card({ img, title, mrp, price }) {
  const styles = useStyles();
  const [isAdded, setIsAdded] = useState(false);

  const clickHandler = () => {
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.container} onClick={clickHandler}>
      <div className={styles.img}>
        <img src={img ?? "./logo.png"} alt="img" />
      </div>
      <div className={styles.contentDiv}>
        <p>{title}</p>
        <p>{price} ₹</p>
        <p>{mrp} ₹</p>
      </div>
      <Button
        className={styles.btn}
        style={{ color: isAdded ? COLOR.RED : COLOR.GREEN }}
      >
        {isAdded ? "Remove" : "Add To Cart"}
      </Button>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    display: "flex",
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
    },
    "& :nth-child(2)": {
      color: COLOR.GREEN,
      fontWeight: "bold",
      marginBottom: -3,
    },
    "& :nth-child(3)": {
      color: COLOR.RED,
      fontSize: 13,
      textDecoration: "line-through",
    },
    flex: 1,
    fontSize: 15,
    overflow: "hidden",
    borderBottom: "2px solid rgba(0,0,0,0.5)",
  },
  btn: {
    position: "absolute",
    top: 30,
    right: 10,
    fontWeight: "bold",
    fontSize: 12,
  },
});
