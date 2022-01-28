import { makeStyles, Button } from "@material-ui/core";
import { useState } from "react";

//-----------------------------------------------> custom components
import { InputBox } from "..";
import { BTN_STYLE, COLOR } from "../../constants";

export default function AddProductBox({ Style, onSave }) {
  const styles = useStyles();
  const [input, setInput] = useState({
    name: "",
    mrp: 0,
    price: 0,
    img: "",
    quantity: 0,
  });

  //-----------------------------------------------> storing inputs
  const changeHandler = (e) => {
    const { value, name } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  //-----------------------------------------------> add Image of Product
  const addImage = () => {};

  return (
    <div className={styles.container} style={Style}>
      <div className={styles.imgDiv} onClick={addImage}>
        <Button className={styles.imgInput}>
          <img src="./icons/image.svg" alt="add img" />
        </Button>
        <p>Add Image</p>
      </div>
      <InputBox
        title="Product Name"
        name="name"
        onChangeHandler={changeHandler}
      />
      <InputBox
        title="Price"
        name="price"
        onChangeHandler={changeHandler}
        type={"number"}
      />
      <InputBox
        title="category"
        name="price"
        onChangeHandler={changeHandler}
        type={"number"}
      />
      <InputBox
        title="MRP"
        name="mrp"
        onChangeHandler={changeHandler}
        type={"number"}
      />
      <InputBox
        title="Quantity"
        name="quantity"
        onChangeHandler={changeHandler}
        type={"number"}
      />
      <Button
        className={styles.save}
        onClick={() => {
          onSave(input);
        }}
      >
        save
      </Button>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "100%",
    maxWidth: 500,
    height: "100%",
    maxHeight: 700,
    paddingInline: 30,
    borderRadius: 10,
    boxShadow: "0px 3px 6px rgba(0,0,0,0.6)",
    backgroundColor: "white",
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
  save: {
    ...BTN_STYLE,
    width: "90%",
    marginInline: "auto",
  },
});
