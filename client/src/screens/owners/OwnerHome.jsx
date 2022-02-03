import { useEffect, useRef, useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import Cookies from "js-cookie";
import axios from "axios";

//-----------------------------------------------> custom component
import { InputBox, ToggleBtn } from "../../components";
import { BTN_STYLE, COLOR } from "../../constants";
import imageUploader from "../../imageUploader";

export default function OwnerHome() {
  const styles = useStyles();
  const fileInput = useRef();
  const [showBtn, setShowBtn] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [canUrgent, setCanUrgent] = useState(false);
  const [img, setImg] = useState("");
  const [data, setData] = useState({
    name: "",
    address: "",
    phoneNumber: null,
    email: "",
  });

  //-----------------------------------------------> on load
  useEffect(() => {
    let isMounted = true;

    const getOwnerData = async () => {
      try {
        const bx = Cookies.get("bx");
        if (bx) {
          let res = await axios.get(`/${bx}/getownerdata`);
          res = res.data;

          if (isMounted) {
            setIsOpen(res.isOpen);
            setCanUrgent(res.canUrgent);
            setShowBtn(true);
            setImg(res.img);
            setData({
              name: res.name,
              address: res.address,
              phoneNumber: res.extras[0].phoneNumber,
              email: res.extras[1].email,
            });
          }
        }
      } catch (e) {
        alert("error in fetching data");
      }
    };

    getOwnerData();
    return () => {
      isMounted = false;
    };
  }, []);

  //-----------------------------------------------> storing inputs
  const changeHandler = (e) => {
    const { value, name } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  //-----------------------------------------------> save data
  const updateOwnerData = async () => {
    try {
      const bx = Cookies.get("bx");
      const ai = Cookies.get("ai");
      const { name, address, phoneNumber, email } = data;

      const res = await axios.put(`/${bx}/${ai}/updateShopDetails`, {
        isOpen,
        canUrgent,
        name,
        img,
        address,
        extras: [{ phoneNumber }, { email }],
      });

      res.status && alert("updated succesfully");
    } catch (e) {
      alert("error in updating data");
    }
  };

  //----------------------------------------------->
  const selectImage = () => {
    fileInput.current.click();
  };

  //-----------------------------------------------> fileinput
  const addImage = async (e) => {
    try {
      const res = await imageUploader(e.target.files[0]);

      setImg(res);
    } catch (e) {
      alert("error in uploading image");
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className={styles.main}>
        <input
          style={{ display: "none" }}
          onChange={addImage}
          ref={fileInput}
          type="file"
        />
        <div className={styles.imgDiv} onClick={selectImage}>
          <Button className={styles.imgInput}>
            <img
              src={img || "./icons/image.svg"}
              alt="add img"
              className={styles.ppImg}
            />
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
        {showBtn && (
          <div className={styles.btnDiv}>
            <ToggleBtn
              Style={{ marginBlock: 20, width: 250 }}
              title={"Shop Open"}
              initialState={isOpen}
              onClickHandler={() => {
                setIsOpen(!isOpen);
              }}
            />
            <ToggleBtn
              Style={{ marginBlock: 20, width: 250 }}
              title={"Urgent Dilivery"}
              initialState={canUrgent}
              onClickHandler={() => {
                setCanUrgent(!canUrgent);
              }}
            />
          </div>
        )}
        <Button className={styles.upload} onClick={updateOwnerData}>
          upload
        </Button>
      </div>
    </form>
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
    width: 65,
    height: 65,
    overflow: "hidden",
    marginInline: "auto",
    borderRadius: 10,
  },
  ppImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
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
