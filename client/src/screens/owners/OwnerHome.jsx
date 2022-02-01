import { makeStyles, Button } from "@material-ui/core";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";

//-----------------------------------------------> custom component
import { InputBox, ToggleBtn } from "../../components";
import { BTN_STYLE, COLOR } from "../../constants";
import { useEffect } from "react";

export default function OwnerHome() {
  const styles = useStyles();
  const [showBtn, setShowBtn] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [canUrgent, setCanUrgent] = useState(false);
  const [data, setData] = useState({
    img: "",
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
        let res = await axios.get(`/${bx}/getownerdata`);
        res = res.data;

        if (isMounted) {
          setIsOpen(res.isOpen);
          setCanUrgent(res.canUrgent);
          setShowBtn(true);
          setData({
            img: res.img,
            name: res.name,
            address: res.address,
            phoneNumber: res.extras[0].phoneNumber,
            email: res.extras[1].email,
          });
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
      const { img, name, address, phoneNumber, email } = data;

      const res = await axios.put(`/${bx}/updateShopDetails`, {
        isOpen,
        canUrgent,
        img,
        name,
        address,
        extras: [{ phoneNumber }, { email }],
      });

      res.status && alert("updated succesfully");
    } catch (e) {
      alert("error in updating data");
    }
  };

  //----------------------------------------------->
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
