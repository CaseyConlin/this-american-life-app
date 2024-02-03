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
  episodeList: EpisodeProps[] | undefined;
  episodeLoader: (epNum: string) => void;
  action: (open: boolean) => void;
  epsLoading: boolean;
  showEpisodes: boolean;
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

  return (
    <div>
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
          <DrawerEpisodeList
            episodeList={props.episodeList}
            episodeLoader={props.episodeLoader}
          />
        </List>
      </SwipeableDrawer>
    </div>
  );
}
