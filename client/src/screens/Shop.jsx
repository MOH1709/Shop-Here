import { makeStyles } from "@material-ui/core";
import { PrimaryHeader } from "../components";

export default function Shop() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <PrimaryHeader />
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    width: "inherit",
  },
});
