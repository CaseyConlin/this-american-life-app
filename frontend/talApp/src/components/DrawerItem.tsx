import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

import Typography from "@mui/material/Typography";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

export interface DrawerItemProps {
  desc: string;
}
export const DrawerItem = (props: DrawerItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton sx={{ paddingTop: 0 }} onClick={() => setOpen(!open)}>
        {!open ? (
          <ArrowDropDownCircleIcon fontSize="small" />
        ) : (
          <ArrowDropDownCircleIcon
            fontSize="small"
            sx={{ transform: "rotateZ(180deg)" }}
          />
        )}
      </IconButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Typography textAlign={"center"} fontSize={14}>
          {props.desc}
        </Typography>
      </Collapse>
    </>
  );
};
