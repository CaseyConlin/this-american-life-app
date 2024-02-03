import ListItemButton from "@mui/material/ListItemButton";
import { DrawerItem } from "./DrawerItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { EpisodeProps } from "../Player/Player";

export interface DrawerProps {
  episodeList: EpisodeProps[] | undefined;
  episodeLoader: (epNum: string) => void;
}

export const DrawerEpisodeList = (props: DrawerProps) => {
  return (
    props.episodeList &&
    props.episodeList.map((episode) => {
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
  );
};
