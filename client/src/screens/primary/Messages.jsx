import { makeStyles } from "@material-ui/core";

//-----------------------------------------------> custom components
import { OwnerMessage } from "../../components/owner";
import { ConsumerMessage } from "../../components";
import { COLOR } from "../../constants";

export default function Messages() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Share the Code generated from order with Shop Owner's, To Confirm Your
        Order & recievr Bill :)
      </p>
      <ConsumerMessage
        pin={389350}
        owners={[
          "Mahavir general store",
          "syamji krishna tailors",
          "bhartiya lithiyam petroliums",
          "bhartiya lithiyam petroliums",
          "bhartiya lithiyam petroliums",
          "bhartiya lithiyam petroliums",
          "bhartiya lithiyam petroliums",
        ]}
      />

      <OwnerMessage
        name="Mohit Ahirwal"
        address="house 10, atmiyavilla society, godhra road halol"
      />
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    flex: 1,
    position: "relative",
    overflowY: "auto",
    overflowX: "hidden",
  },
  title: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    backgroundColor: COLOR.SECONDARY,
    color: COLOR.PRIMARY,
  },
});
