import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import CircularProgress from "@mui/material/CircularProgress";

export interface FloatingButtonProps {
  // openDrawer: React).MouseEventHandler<HTMLButtonElement>;
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
  });

  return (
    <StyledFab
      color="secondary"
      aria-label="add"
      onClick={() => props.action(true)}
    >
      {props.epsLoading ? <CircularProgress /> : <PlaylistPlayIcon />}
    </StyledFab>
  );
};
