import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import { EpisodeProps } from "../Player/Player";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ListItemButton from "@mui/material/ListItemButton";
import { DrawerItem } from "./DrawerItem";
import Typography from "@mui/material/Typography";
import { DrawerEpisodeList } from "./DrawerEpisodeList";
import BottomAppBar from "./AppBar";
import { IconButton } from "@mui/material";

export interface DrawerProps {
  drawerOpen: boolean;
  openDrawer: (open: boolean) => void;
  action: (open: boolean) => void;
  epsLoading: boolean;
}

// type Anchor = "top" | "left" | "bottom" | "right";

export default function AppDrawer(props: DrawerProps) {
  const DrawerItemButton = styled(ListItemButton)(() => ({
    "&&": {
      position: "sticky",
      top: 0,
      width: "100%",
      background: "#ea0001",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      opactiy: 1,
      zIndex: 100,
      boxShadow: "none",
      border: 0,
    },
    "&&:hover ": {
      filter: "brightness(120%)",
    },
  }));

  return (
    <div>
      <Box
        sx={{
          position: "absolute",
          top: "auto",
          bottom: 0,
          left: 0,
          overflow: "auto",
          width: "100vw",
          height: "5vh",
          justifyContent: "center",
          display: "flex",
          backgroundColor: "red",
          m: 0,
        }}
      >
        <IconButton
          sx={{ top: 0, color: "#fff" }}
          onClick={() => props.openDrawer(!props.drawerOpen)}
        >
          <ArrowDropUpIcon fontSize="large" />
        </IconButton>
        <SwipeableDrawer
          sx={{ width: "50%", height: props.drawerOpen ? "100vh" : "5vh" }}
          anchor={"bottom"}
          open={props.drawerOpen}
          onClose={() => props.openDrawer(false)}
          onOpen={() => props.openDrawer(true)}
          PaperProps={{
            sx: {
              width: "100vw",
              WebkitBorderTopRightRadius: "25px",
              WebkitBorderTopLeftRadius: "25px",
            },
          }}
        >
          {" "}
          <List
            sx={{
              width: "100vw",
              // maxWidth: 360,
              justifyContent: "center",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: "95vh",
              "& ul": {},
              m: 0,
              p: 0,
            }}
          >
            <DrawerItemButton
              divider={true}
              onClick={() => props.openDrawer(false)}
            >
              <ArrowDropDownIcon />
            </DrawerItemButton>
            <BottomAppBar
              action={props.action}
              epsLoading={props.epsLoading}
              openDrawer={props.openDrawer}
            />
          </List>
        </SwipeableDrawer>
      </Box>
    </div>
  );
}
