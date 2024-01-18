import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

export interface ActPlayIconProps {
  actPlaying: number;
  actNumber: number;
  actTimestamp: number;
  playPauseHandler: () => void;
  actHandler: (timeStamp: number) => void;
  paused: boolean;
}

export const ActPlayPauseIcon = (props: ActPlayIconProps) => {
  return (
    <ListItemIcon sx={{ margin: 0, justifyContent: "center" }}>
      <IconButton
        onClick={() =>
          props.actPlaying == props.actNumber
            ? props.playPauseHandler()
            : props.actHandler(props.actTimestamp)
        }
      >
        {props.actPlaying == props.actNumber && !props.paused ? (
          <PauseCircleIcon />
        ) : (
          <PlayCircleIcon />
        )}
      </IconButton>
    </ListItemIcon>
  );
};
