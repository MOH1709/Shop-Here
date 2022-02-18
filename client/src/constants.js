const FLEX_CENTER = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const COLOR = {
  PRIMARY: "#03045e",
  SECONDARY: "#00b4d8",
  GREEN: "#12CD3F",
  RED: "#FF0C0C",
  BLACK: "#222327",
  WHITE: "#ffffff",
};
const SHADOW = "0px 3px 6px rgb(0,0,0,0.3)";

const BTN_STYLE = {
  "&:hover": {
    color: COLOR.SECONDARY,
    backgroundColor: COLOR.PRIMARY,
  },
  position: "relative",
  ...FLEX_CENTER,

  color: "white",
  backgroundColor: COLOR.PRIMARY,
};

export { FLEX_CENTER, SHADOW, COLOR, BTN_STYLE };