import { makeStyles, Button } from "@material-ui/core";

//-----------------------------------------------> custom Componenets
import { BTN_STYLE, COLOR, SHADOW } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function OwnerOrderCard({
  id,
  name,
  address,
  isUrgent,
  isDelivered,
}) {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p className={styles.name}>
        Time : <span>{name ? name.split("GMT")[0] : "none"}</span>
      </p>
      <p className={styles.address}>
        Address : <span>{address}</span>
      </p>
      <p className={styles.isUrgent}>{isUrgent ? "Urgent Order 🕐" : ""}</p>
      <p
        className={styles.isUrgent}
        style={{ color: isDelivered ? COLOR.GREEN : COLOR.RED }}
      >
        {isDelivered ? "Delivered Successfully🥳" : "fail to deliver😞"}
      </p>

      <Button
        className={styles.btn}
        onClick={() => {
          navigate(`/city/owner/setting/orders/${id}`);
        }}
      >
        click to show more
      </Button>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    margin: 10,
    color: "white",
    padding: 10,
    flexDirection: "column",
    cursor: "pointer",
    marginBlock: 10,
    borderRadius: 5,
    boxShadow: SHADOW,
    backgroundColor: "white",
  },
  name: {
    "& span": {
      fontWeight: "bold",
      color: COLOR.PRIMARY,
    },
    paddingLeft: 10,
    color: COLOR.SECONDARY,
  },
  address: {
    "& span": {
      color: COLOR.PRIMARY,
      fontWeight: "bold",
    },
    color: COLOR.SECONDARY,

    paddingLeft: 10,
    overflow: "hidden",
  },
  isUrgent: {
    paddingLeft: 10,
    fontWeight: "bold",
    color: COLOR.SECONDARY,
  },
  inputDiv: {
    "& Button": {
      ...BTN_STYLE,
      fontSize: 12,
    },
    "& input": {
      flex: 1,
      minWidth: 10,
      paddingInline: 10,
      outline: "none",
      borderRadius: 3,
      border: `2px solid ${COLOR.PRIMARY}`,
    },
    display: "flex",
    marginBlock: 20,
  },
  btn: {
    ...BTN_STYLE,
    marginTop: 10,
    padding: 5,
    height: 40,
    fontSize: 12,
    width: "100%",
  },
});
