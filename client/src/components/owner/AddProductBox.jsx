import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";

//-----------------------------------------------> custom components
import { InputBox } from "..";
import imageUploader from "../../imageUploader";
import { BTN_STYLE, COLOR } from "../../constants";
import { useRef } from "react";

export default function AddProductBox({
  Style,
  onSave,
  input,
  onDelete,
  setInput,
  showDelete,
}) {
  const styles = useStyles();
  const fileInput = useRef();
  const [prevImage] = useState(input.img);
  const [img, setImg] = useState(input.img);
  const [file, setFile] = useState("");

  //-----------------------------------------------> storing inputs
  const changeHandler = (e) => {
    const { value, name } = e.target;

    setInput({
      ...input,
      [name]: name === "category" ? value.toUpperCase() : value,
    });
  };

  //----------------------------------------------->
  const selectImage = () => {
    fileInput.current.click();
  };

  //-----------------------------------------------> add Image of Product
  const addImage = (e) => {
    try {
      setFile(e.target.files[0]);
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          setImg(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    } catch (e) {
      alert("error in uploading image");
    }
  };

  //----------------------------------------------->
  const deleteProduct = async () => {
    try {
      const bx = Cookies.get("bx");
      await axios.delete(`/product/${bx}/${input._id}`);
      if (input.img) {
        await axios.delete(`/utils/image/${input.img.split("?id=")[1]}`);
      }
      onDelete();
    } catch (e) {
      alert("error in editing products");
    }
  };

  return (
    <div className={styles.container} style={Style}>
      <input
        style={{ display: "none" }}
        onChange={addImage}
        ref={fileInput}
        type="file"
      />
      <div className={styles.imgDiv} onClick={selectImage}>
        <Button className={styles.imgInput}>
          <img
            src={img || input.img || "./icons/image.svg"}
            alt="add img"
            className={styles.ppImg}
          />
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
        onClick={async () => {
          if (prevImage) {
            await axios.delete(`/utils/image/${prevImage?.split("?id=")[1]}`);
          }

          onSave({
            ...input,
            img: file ? await imageUploader(file) : input.img,
          });
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
    width: 65,
    height: 65,
    overflow: "hidden",
    marginInline: "auto",
    borderRadius: "50%",
  },
  ppImg: {
    minWidth: 65,
    minHeight: 65,
    objectFit: "cover",
  },
  save: {
    ...BTN_STYLE,
    width: "90%",
    marginTop: 20,
    marginInline: "auto",
  },
});
