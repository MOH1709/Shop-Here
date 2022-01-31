import { makeStyles, Button } from "@material-ui/core";
import { useState } from "react";

//-----------------------------------------------> custom component
import { InputBox, ToggleBtn } from "../../components";
import { BTN_STYLE, COLOR } from "../../constants";

export default function OwnerHome() {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [canUrgent, setCanUrgent] = useState(false);
  const [data, setData] = useState({
    img: "",
    name: "",
    address: "",
    phoneNumber: null,
    email: "",
  });

  //-----------------------------------------------> storing inputs
  const changeHandler = (e) => {
    const { value, name } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };
  const addImage = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.imgDiv} onClick={addImage}>
          <Button className={styles.imgInput}>
            <img src="./icons/image.svg" alt="add img" />
          </Button>
          <p>Add Image</p>
        </div>
        <InputBox
          Style={{ marginBlock: 20 }}
          title="Shop Name"
          name="name"
          value={data.name}
          onChangeHandler={changeHandler}
        />
        <InputBox
          Style={{ marginBlock: 20 }}
          title="Shop Address Without Name"
          name="address"
          value={data.address}
          onChangeHandler={changeHandler}
        />
        <InputBox
          Style={{ marginBlock: 20 }}
          title="Email"
          name="email"
          value={data.email}
          onChangeHandler={changeHandler}
        />
        <InputBox
          Style={{ marginBlock: 20 }}
          title="Contact Number"
          name="phoneNumber"
          value={data.phoneNumber}
          onChangeHandler={changeHandler}
          type={"number"}
        />
        <div className={styles.btnDiv}>
          <ToggleBtn
            Style={{ marginBlock: 20, width: 250, marginInline: "auto" }}
            title={"Shop Open"}
            onClickHandler={() => {
              setIsOpen(!isOpen);
            }}
          />
          <ToggleBtn
            Style={{ marginBlock: 20, width: 250, marginInline: "auto" }}
            title={"Urgent Dilivery"}
            onClickHandler={() => {
              setCanUrgent(!canUrgent);
            }}
          />
        </div>
        <Button className={styles.upload}>upload</Button>
      </div>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    flex: 1,
    overflowY: "auto",
  },
  main: {
    flex: 1,
    minHeight: 400,
    padding: "10%",
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
  btnDiv: {
    display: "flex",
    flexWrap: "wrap",
  },
  upload: {
    ...BTN_STYLE,
    width: "90%",
    marginBlock: 30,
    marginInline: "auto",
  },
});
