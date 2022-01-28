import { makeStyles, Button } from "@material-ui/core";

//-----------------------------------------------> custom component
import { InputBox } from "../../components";
import { BTN_STYLE, COLOR } from "../../constants";

export default function OwnerHome() {
  const styles = useStyles();

  const changeHandler = () => {};
  const addImage = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.imgDiv} onClick={addImage}>
        <Button className={styles.imgInput}>
          <img src="./icons/image.svg" alt="add img" />
        </Button>
        <p>Add Image</p>
      </div>
      <InputBox
        title="Price"
        name="price"
        onChangeHandler={changeHandler}
        type={"number"}
      />
      <InputBox
        title="Price"
        name="price"
        onChangeHandler={changeHandler}
        type={"number"}
      />
      <InputBox
        title="Price"
        name="price"
        onChangeHandler={changeHandler}
        type={"number"}
      />
      <Button className={styles.upload}>upload</Button>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    flex: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingInline: "10%",
  },
  imgDiv: {
    "& p": {
      marginBlock: 5,
      fontWeight: "bold",
      color: COLOR.SECONDARY,
    },
    textAlign: "center",
    cursor: "pointer",
  },
  imgInput: {
    position: "realative",
    ...BTN_STYLE,
    fontSize: 10,
    height: 65,
    marginInline: "auto",
    borderRadius: "50%",
  },
  upload: {
    ...BTN_STYLE,
    width: "90%",
    marginInline: "auto",
  },
});
