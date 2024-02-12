import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import { EpisodeProps } from "../Player/Player";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ListItemButton from "@mui/material/ListItemButton";
import { DrawerItem } from "./Episodes/DrawerItem";
import Typography from "@mui/material/Typography";
import { DrawerEpisodeList } from "./Episodes/DrawerEpisodeList";
import BottomAppBar from "../AppBar/BottomAppBar";
import { IconButton } from "@mui/material";
import SignUp from "./Auth/Singup";
import { AuthForm } from "./Auth/AuthForm";

export interface DrawerProps {
  // drawerOpen: boolean;
  user: boolean;
  openDrawer: () => void;
  episodeList: EpisodeProps[] | undefined;
  episodeLoader: (epNum: string) => void;
  action: (open: boolean) => void;
  epsLoading: boolean;
  setDrawerContents: (set: "auth" | "episodes" | undefined) => void;

  // showEpisodes: boolean;
  drawerContents: "auth" | "episodes" | undefined;
}

// type Anchor = "top" | "left" | "bottom" | "right";

export default function ContentDrawer(props: DrawerProps) {
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
    },
    "&&:hover ": {
      filter: "brightness(120%)",
    },
  }));
  console.log("ddkd", props.drawerContents);

  return (
    <div>
      <SwipeableDrawer
        sx={{ width: "50%", height: props.drawerContents ? "100vh" : "5vh" }}
        anchor={"bottom"}
        open={props.drawerContents != undefined}
        onClose={() => props.setDrawerContents(undefined)}
        onOpen={() => {}}
        PaperProps={{
          sx: {
            width: "100vw",
            WebkitBorderTopRightRadius: "25px",
            WebkitBorderTopLeftRadius: "25px",
          },
        }}
      >
        <List
          sx={{
            width: "100vw",
            // maxWidth: 360,
            justifyContent: "center",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            height: props.drawerContents == "episodes" ? "95vh" : "90vh",
            maxHeight: "95vh",
            "& ul": {},
            m: 0,
            p: 0,
          }}
        >
          <DrawerItemButton
            divider={true}
            onClick={() => props.setDrawerContents(undefined)}
          >
            <ArrowDropDownIcon />
          </DrawerItemButton>
          {props.drawerContents === "episodes" && (
            <DrawerEpisodeList
              episodeList={props.episodeList}
              episodeLoader={props.episodeLoader}
            />
          )}
          {props.drawerContents === "auth" && <AuthForm user={props.user} />}
        </List>
      </SwipeableDrawer>
    </div>
  );
}
