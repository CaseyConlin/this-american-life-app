// import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { EpisodeProps } from "./Player/Player";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { IconButton } from "@mui/material";

// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

export interface DrawerProps {
  drawerOpen: boolean;
  openDrawer: (open: boolean) => void;
  episodeList: EpisodeProps[] | undefined;
  episodeLoader: (epNum: string) => void;
}

// type Anchor = "top" | "left" | "bottom" | "right";

export default function SwipeableTemporaryDrawer(props: DrawerProps) {
  return (
    <div>
      <Box>
        <SwipeableDrawer
          sx={{ width: 50 }}
          anchor={"bottom"}
          open={props.drawerOpen}
          onClose={() => props.openDrawer(false)}
          onOpen={() => props.openDrawer(true)}
        >
          <IconButton onClick={() => props.openDrawer(false)}>
            <ArrowDropDownIcon />
          </IconButton>
          {props.episodeList
            ? props.episodeList.map((episode) => {
                // console.log(episode);
                return (
                  <button
                    onClick={() => {
                      console.log(episode);
                      props.episodeLoader(episode.epNum);
                    }}
                  >
                    {episode.epNum} - {episode.epDate} {episode.title}{" "}
                    {episode.desc}
                  </button>
                );
              })
            : ""}
        </SwipeableDrawer>
      </Box>
    </div>
  );
}
