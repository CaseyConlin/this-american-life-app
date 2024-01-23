import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import { EpisodeProps } from "./Player/Player";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ListItemButton from "@mui/material/ListItemButton";
import { DrawerItem } from "./DrawerItem";

import Typography from "@mui/material/Typography";

export interface DrawerProps {
  drawerOpen: boolean;
  openDrawer: (open: boolean) => void;
  episodeList: EpisodeProps[] | undefined;
  episodeLoader: (epNum: string) => void;
}

// type Anchor = "top" | "left" | "bottom" | "right";

export default function SwipeableTemporaryDrawer(props: DrawerProps) {
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
      <Box
        sx={{
          position: "relative",
          overflow: "auto",
          width: "50px",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <SwipeableDrawer
          sx={{ width: "50%" }}
          anchor={"bottom"}
          open={props.drawerOpen}
          onClose={() => props.openDrawer(false)}
          onOpen={() => props.openDrawer(true)}
          PaperProps={{
            sx: {
              width: "90%",
              left: "5%",
              WebkitBorderTopRightRadius: "25px",
              WebkitBorderTopLeftRadius: "25px",
            },
          }}
        >
          <List
            sx={{
              width: "100%",
              // maxWidth: 360,
              justifyContent: "center",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: "90vh",
              "& ul": { padding: 0 },
              paddingTop: 0,
            }}
          >
            <DrawerItemButton
              divider={true}
              onClick={() => props.openDrawer(false)}
            >
              <ArrowDropDownIcon />
            </DrawerItemButton>
            {props.episodeList
              ? props.episodeList.map((episode) => {
                  // console.log(episode);
                  return (
                    <Box
                      key={episode.epNum}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <ListItemButton
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          onClick={() => {
                            props.episodeLoader(episode.epNum);
                          }}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            fontStyle={"bold"}
                            fontSize={12}
                            paddingInlineEnd={1}
                            fontWeight={400}
                          >
                            {episode.epNum}
                          </Typography>
                          <Typography
                            fontStyle={"heavy"}
                            fontSize={16}
                            fontWeight={800}
                            textAlign={"center"}
                          >
                            {episode.title}
                          </Typography>
                          <Typography
                            fontStyle={"italic"}
                            fontSize={12}
                            paddingInlineStart={1}
                          >
                            {episode.epDate}
                          </Typography>
                        </Box>
                        <DrawerItem desc={episode.desc} />
                      </ListItemButton>
                    </Box>
                  );
                })
              : ""}{" "}
          </List>
        </SwipeableDrawer>
      </Box>
    </div>
  );
}
