import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";

import { FLEX_CENTER } from "./constants";

export default function App() {
  const styles = useStyles();
  const [text, setText] = useState("");

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch("/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    });
    console.log(res);
  };

  return (
    <form method="POST" className={styles.container}>
      <input
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button onClick={login}> Save </Button>
    </form>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    ...FLEX_CENTER,

    minHeight: "100vh",
    maxWidth: 1388,
    marginInline: "auto",

    backgroundColor: "white",
    boxShadow: "0px 3px 30px rgb(0,0,0,0.6)",
  },
});
