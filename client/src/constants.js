const FLEX_CENTER = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const COLOR = {
  PRIMARY: "#002a43",
  SECONDARY: "#7DD893",
  GREEN: "#12CD3F",
};
const SHADOW = "0px 3px 6px rgb(0,0,0,0.3)";

const BTN_STYLE = {
  "&:hover": {
    color: COLOR.SECONDARY,
    backgroundColor: COLOR.PRIMARY,
  },
  position: "relative",
  ...FLEX_CENTER,

  color: COLOR.SECONDARY,
  backgroundColor: COLOR.PRIMARY,
};

export { FLEX_CENTER, SHADOW, COLOR, BTN_STYLE };