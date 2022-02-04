import { useEffect, useRef, useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import Cookies from "js-cookie";
import axios from "axios";

//-----------------------------------------------> custom component
import { InputBox, ToggleBtn } from "../../components";
import { BTN_STYLE, COLOR } from "../../constants";
import imageUploader from "../../imageUploader";
import { useNavigate } from "react-router-dom";

export default function OwnerHome() {
  const styles = useStyles();
  const fileInput = useRef();
  const navigate = useNavigate();
  const [showBtn, setShowBtn] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [canUrgent, setCanUrgent] = useState(false);
  const [img, setImg] = useState("");
  const [file, setFile] = useState(0);
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
      const { name, address, phoneNumber, email } = data;

      const imgPath = file ? await imageUploader(file) : img;

      const res = await axios.put(`/${bx}/updateShopDetails`, {
        isOpen,
        canUrgent,
        areas: ["61fca187b189a6bb3272e47d", "61fbfc3903ba1847c6202763"],
        name,
        img: imgPath,
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

  //-----------------------------------------------> select areas
  const selectAreas = () => {
    navigate("/city/owner/areaSelection");
  };

  //-----------------------------------------------> fileinput
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

  return (
    <div className={styles.container}>
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
        <Button className={styles.upload} onClick={selectAreas}>
          add areas
        </Button>
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
