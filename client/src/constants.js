const FLEX_CENTER = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const COLOR = {
  PRIMARY: "#00b4d8",
  SECONDARY: "#03045e",
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

  border: "none",
  borderRadius: 5,
  color: "white",
  backgroundColor: COLOR.PRIMARY,
};

export { FLEX_CENTER, SHADOW, COLOR, BTN_STYLE };