import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { formatDuration } from "./player-utils";

export interface TimeSliderProps {
  timeMarks: { value: number }[];
  duration: number;
  position: number;
  scrubTimeHandler: (event: Event, newValue: number | number[]) => void;
}

export const TimeSlider = (props: TimeSliderProps) => {
  const theme = useTheme();

  const TimeSlider = styled(Slider)(() => ({
    "& .MuiSlider-mark ": {
      borderRadius: 50,
      height: "12px",
      width: "1px",
    },

    "& .MuiSlider-mark.MuiSlider-markActive ": {
      backgroundColor: "#000",
    },
  }));

  const TinyText = styled(Typography)({
    fontSize: "0.75rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
  });

  return (
    <>
      <TimeSlider
        aria-label="time-indicator"
        size="small"
        value={props.position}
        min={0}
        marks={props.timeMarks}
        step={1}
        max={props.duration}
        onChange={props.scrubTimeHandler}
        sx={{
          color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
          height: 4,
          "& .MuiSlider-thumb": {
            width: 8,
            height: 8,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&::before": {
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 8px ${
                theme.palette.mode === "dark"
                  ? "rgb(255 255 255 / 16%)"
                  : "rgb(0 0 0 / 16%)"
              }`,
            },
            "&.Mui-active": {
              width: 20,
              height: 20,
            },
          },
          "& .MuiSlider-rail": {
            opacity: 0.28,
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: -2,
        }}
      >
        <TinyText>{formatDuration(props.position)}</TinyText>
        <TinyText>-{formatDuration(props.duration - props.position)}</TinyText>
      </Box>
    </>
  );
};
