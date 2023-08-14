import { AppBar } from "@mui/material";
import { FC } from "react";
import { appBarHeight } from "../theme/measurements";

interface Props {
  text: string;
}

export const BasicAppBar: FC<Props> = ({ text }) => {
  return (
    <AppBar
      color={"primary"}
      style={{ height: appBarHeight, justifyContent: "center" }}
    >
      <span style={{ textAlign: "center", fontSize: "x-large" }}>{text}</span>
    </AppBar>
  );
};
