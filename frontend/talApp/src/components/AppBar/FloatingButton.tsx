import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import CircularProgress from "@mui/material/CircularProgress";

export interface FloatingButtonProps {
  action: (open: boolean) => void;
  epsLoading: boolean;
}

export const FloatingButton = (props: FloatingButtonProps) => {
  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
    "& .MuiSvgIcon-root:hover ": {
      backgroundColor: "#fff",
    },
    "&.MuiFab-root:hover": {
      backgroundColor: "#fff",
      filter: "brightness(85%)",
    },
  });

  return (
    <StyledFab
      color="secondary"
      aria-label="add"
      sx={{ backgroundColor: "#fff", color: "#02135b" }}
      onClick={() => props.action(true)}
    >
      {props.epsLoading ? (
        <CircularProgress sx={{ color: "#02135b" }} />
      ) : (
        <PlaylistPlayIcon />
      )}
    </StyledFab>
  );
};
