import { equalizerKeyFrames } from "../player-utils";
import { Box } from "@mui/material";

export interface EqualizerProps {
  showEq: boolean;
  actPlaying: number;
  actNumber: number;
  paused: boolean;
}
export const EqualizerGraphics = (props: EqualizerProps) => {
  return (
    <Box
      sx={{
        height: "20px",
        width: "25px",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {props.showEq && props.actPlaying == props.actNumber && !props.paused ? (
        <>
          <Box
            sx={{
              "@keyframes eqalizer": equalizerKeyFrames,
              width: "2px",
              height: "100%",
              background: "#1dd05d",
              borderRadius: "2px",
              margin: "0 1px",
              animation: `eqalizer ${Math.floor(
                Math.random() * (6 - 2) + 2
              )}s steps(20, end) infinite;`,
            }}
          />
          <Box
            sx={{
              "@keyframes eqalizer": equalizerKeyFrames,
              width: "2px",
              height: "100%",
              background: "#1dd05d",
              borderRadius: "2px",
              margin: "0 1px",
              animation: `eqalizer ${Math.floor(
                Math.random() * (6 - 2) + 2
              )}s steps(20, end) infinite;`,
            }}
          />
          <Box
            sx={{
              "@keyframes eqalizer": equalizerKeyFrames,
              width: "2px",
              height: "100%",
              background: "#1dd05d",
              borderRadius: "2px",
              margin: "0 1px",
              animation: `eqalizer ${Math.floor(
                Math.random() * (6 - 2) + 2
              )}s steps(20, end) infinite;`,
            }}
          />
          <Box
            sx={{
              "@keyframes eqalizer": equalizerKeyFrames,
              width: "2px",
              height: "100%",
              background: "#1dd05d",
              borderRadius: "2px",
              margin: "0 1px",
              animation: `eqalizer ${Math.floor(
                Math.random() * (6 - 2) + 2
              )}s steps(20, end) infinite;`,
            }}
          />
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
