import { useState, useRef, useCallback, ChangeEvent } from "react";
import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import Forward10RoundedIcon from "@mui/icons-material/Forward10Rounded";
import Replay10RoundedIcon from "@mui/icons-material/Replay10Rounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import icon from "../../assets/talicon.webp";
import { Grid } from "@mui/material";
import { CoverImage } from "./CoverImage";
import { ActInfoContainer } from "./ActInfo/ActInfoContainer";
import { TimeSlider } from "./TimeSlider";

const WallPaper = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  overflow: "hidden",
  background: "#01135b",
});

const Widget = styled("div")(() => ({
  padding: 8,
  borderRadius: 16,
  width: "96%",
  maxWidth: "98%",
  maxHeight: "90vh",
  margin: "1vh auto 1vh",
  position: "relative",
  zIndex: 1,
  backgroundColor: "#fff",
}));

export interface Act {
  name: string;
  summary: string;
  number: number;
  timestamp: number;
  byline: string;
}
export interface EpisodeProps {
  audio: string;
  epNum: string;
  epDate: string;
  title: string;
  desc: string;
  acts: Act[];
}
export default function MusicPlayerSlider(props: EpisodeProps) {
  const theme = useTheme();
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(true);
  const [volume, setVolume] = useState(50);
  const [actPlaying, setActPlaying] = useState(0);
  const [showEq, setShowEq] = useState(false);

  const mainIconColor = "#000";
  const lightIconColor = "rgba(0,0,0,0.4)";

  const audioRef = useRef<HTMLAudioElement>(null);

  const timeUpdate = useCallback(
    (event: ChangeEvent<HTMLAudioElement>) => {
      findAct(props.acts);
      setPosition(Math.floor(event.currentTarget.currentTime));
      event.currentTarget.paused ? setPaused(true) : setPaused(false);
    },
    [setPosition, props.acts]
  );

  const playPauseHandler = () => {
    delayShowEq();
    paused ? setPaused(false) : setPaused(true);
    // setPaused(!paused);

    if (audioRef.current) {
      findAct(props.acts);
      audioRef.current.paused
        ? audioRef.current.play()
        : audioRef.current.pause();
    }
  };

  const durationHandler = () => {
    if (audioRef.current) {
      console.log(audioRef.current.duration);
      setDuration(Math.floor(audioRef.current.duration));
    }
  };

  const scrubTimeHandler = (event: Event, newValue: number | number[]) => {
    event;
    if (typeof newValue === "number") {
      setPosition(newValue);

      if (audioRef.current) {
        audioRef.current.currentTime = newValue;
        delayShowEq();
      }
    }
  };

  const volumeHandler = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      event;
      setVolume(newValue);

      if (audioRef.current) {
        audioRef.current.volume = newValue / 100;
      }
    }
  };

  const findAct = (acts: Act[]) => {
    let currentAct = 0;
    let currentTime = 0;
    if (audioRef.current) {
      currentTime = audioRef.current.currentTime;
    }

    while (
      currentAct < acts.length &&
      acts[currentAct].timestamp < currentTime
    ) {
      currentAct++;
    }
    return setActPlaying(currentAct - 1);
  };

  const actHandler = (timestamp: number) => {
    delayShowEq();
    if (audioRef.current) {
      audioRef.current.currentTime = timestamp;
      audioRef.current.play();
    }
    setPosition(Math.floor(timestamp));
    setPaused(false);
  };

  const delayShowEq = () => {
    setShowEq(false);
    const timer = setTimeout(() => {
      setShowEq(true);
    }, 400);
    setShowEq(true);
    return () => clearTimeout(timer);
  };

  const skipHandler = (dir: string) => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const nexAct =
        dir == "next"
          ? props.acts.find((act) => act.timestamp > currentTime)
          : props.acts.reverse().find((act) => act.timestamp < currentTime);
      if (nexAct) {
        audioRef.current.currentTime = nexAct?.timestamp;
        setPosition(Math.floor(nexAct?.timestamp));
      }
    }
  };

  const shortSkipHandler = (dir: string) => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      if (dir == "next") audioRef.current.currentTime = currentTime + 10;
      else audioRef.current.currentTime = currentTime - 10;
      setPosition(Math.floor(currentTime));
    }
  };
  const makeMarks = () => {
    const newMarks: { value: number }[] = [];
    props.acts.map((act) => {
      newMarks.push({ value: act.timestamp });
    });
    return newMarks;
  };
  const timeMarks = makeMarks();

  return (
    <Grid
      container
      margin={"auto"}
      xs={12}
      md={6}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Widget>
          <audio
            ref={audioRef}
            src={props.audio}
            onTimeUpdate={timeUpdate}
            onDurationChange={durationHandler}
          />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CoverImage imgSrc={icon} />

            <Box sx={{ ml: 1.5, minWidth: 0 }}>
              <Typography color="text.secondary" fontWeight={500}>
                {props.epNum}
              </Typography>
              <Typography>
                <b>{props.title}</b>
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={400}
              >
                {props.epDate}
              </Typography>
            </Box>
          </Box>
          <TimeSlider
            timeMarks={timeMarks}
            position={position}
            scrubTimeHandler={scrubTimeHandler}
            duration={duration}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: -1,
            }}
          >
            <IconButton
              aria-label="previous act"
              onClick={() => skipHandler("prev")}
            >
              <SkipPreviousRoundedIcon
                fontSize="large"
                htmlColor={mainIconColor}
              />
            </IconButton>
            <IconButton
              aria-label="replay 10 seconds"
              onClick={() => shortSkipHandler("rew")}
            >
              <Replay10RoundedIcon fontSize="large" htmlColor={mainIconColor} />
            </IconButton>
            <IconButton
              aria-label={paused ? "play" : "pause"}
              onClick={() => playPauseHandler()}
            >
              {paused ? (
                <PlayArrowRounded
                  sx={{ fontSize: "3rem" }}
                  htmlColor={mainIconColor}
                />
              ) : (
                <PauseRounded
                  sx={{ fontSize: "3rem" }}
                  htmlColor={mainIconColor}
                />
              )}
            </IconButton>
            <IconButton
              aria-label="skip 10 seconds"
              onClick={() => shortSkipHandler("next")}
            >
              <Forward10RoundedIcon
                fontSize="large"
                htmlColor={mainIconColor}
              />
            </IconButton>
            <IconButton
              aria-label="next act"
              onClick={() => skipHandler("next")}
            >
              <SkipNextRoundedIcon fontSize="large" htmlColor={mainIconColor} />
            </IconButton>
          </Box>
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1, px: 1 }}
            alignItems="center"
          >
            <VolumeDownRounded htmlColor={lightIconColor} />
            <Slider
              aria-label="Volume"
              defaultValue={30}
              value={volume}
              onChange={volumeHandler}
              sx={{
                color:
                  theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
                "& .MuiSlider-track": {
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  width: 24,
                  height: 24,
                  backgroundColor: "#fff",
                  "&::before": {
                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                  },
                  "&:hover, &.Mui-focusVisible, &.Mui-active": {
                    boxShadow: "none",
                  },
                },
              }}
            />
            <VolumeUpRounded htmlColor={lightIconColor} />
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                textAlign={"center"}
                letterSpacing={-0.25}
                padding={1}
              >
                {props.desc}
              </Typography>
            </Box>
          </Box>
          {/* <Box> */}
          {/* <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
              </ListSubheader>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Sent mail" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>
          </List> */}
          {props.acts.map((act) => {
            return (
              <ActInfoContainer
                key={act.number}
                actNumber={act.number}
                showEq={showEq}
                paused={paused}
                actPlaying={actPlaying}
                actTimestamp={act.timestamp}
                playPauseHandler={playPauseHandler}
                actHandler={actHandler}
                actName={act.name}
                actDescription={act.summary}
              />
            );
          })}
        </Widget>
        <WallPaper />
      </Box>
    </Grid>
  );
}
