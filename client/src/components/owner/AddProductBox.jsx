import axios from "axios";
import Cookies from "js-cookie";
import { makeStyles, Button } from "@material-ui/core";

//-----------------------------------------------> custom components
import { InputBox } from "..";
import { BTN_STYLE, COLOR } from "../../constants";

export default function AddProductBox({
  Style,
  onSave,
  input,
  setInput,
  showDelete,
}) {
  const styles = useStyles();

  //-----------------------------------------------> storing inputs
  const changeHandler = (e) => {
    const { value, name } = e.target;

    setInput({
      ...input,
      [name]: name === "category" ? value.toUpperCase() : value,
    });
  };

  //-----------------------------------------------> add Image of Product
  const addImage = () => {};

  //----------------------------------------------->
  const deleteProduct = async () => {
    try {
      await axios.delete(`/${Cookies.get("bx")}/products/${input._id}`);
      window.location.reload();
    } catch (e) {
      alert("error in editing products");
    }
  };

  return (
    <div className={styles.container} style={Style}>
      <div className={styles.imgDiv} onClick={addImage}>
        <Button className={styles.imgInput}>
          <img src="./icons/image.svg" alt="add img" />
        </Button>
        <p>Add Image</p>
      </div>
      <InputBox
        Style={{ marginBlock: 30 }}
        title="Product Name"
        name="name"
        value={input.name}
        onChangeHandler={changeHandler}
      />
      <InputBox
        Style={{ marginBlock: 30 }}
        title="category"
        name="category"
        value={input.category}
        onChangeHandler={changeHandler}
      />
      <InputBox
        Style={{ marginBlock: 30 }}
        title="Price"
        name="price"
        value={input.price}
        onChangeHandler={changeHandler}
        type={"number"}
      />

      <InputBox
        Style={{ marginBlock: 30 }}
        title="MRP"
        name="MRP"
        value={input.MRP}
        onChangeHandler={changeHandler}
        type={"number"}
      />
      <InputBox
        Style={{ marginBlock: 30 }}
        title="Quantity"
        name="quantity"
        value={input.quantity}
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
      {showDelete && (
        <Button className={styles.save} onClick={deleteProduct}>
          delete
        </Button>
      )}
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    width: "100%",
    maxWidth: 500,
    height: "100%",
    maxHeight: 700,
    padding: 30,
    borderRadius: 10,
    boxShadow: "0px 3px 6px rgba(0,0,0,0.6)",
    backgroundColor: "white",
    overflow: "auto",
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
    marginTop: 20,
    marginInline: "auto",
  },
});
