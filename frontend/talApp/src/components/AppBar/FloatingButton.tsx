import { styled } from "@mui/material/styles";
import Button from "@mui/material/Fab";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CircularProgress from "@mui/material/CircularProgress";

export interface FloatingButtonProps {
  action: (open: boolean) => void;
  epsLoading: boolean;
  menu: "episodes" | "auth";
  openDrawer: (open: boolean) => void;
}

export const FloatingButton = (props: FloatingButtonProps) => {
  const icons = {
    episodes: <PlaylistPlayIcon />,
    auth: <AccountCircleIcon fontSize="large" />,
  };
  const icon = icons[props.menu];

  const StyledFab = styled(Button)({
    // position: "absolute",
    // zIndex: 1,
    // top: 15,
    // left: 0,
    // right: 0,
    // margin: "0 auto",
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
      onClick={() => {
        props.action(true);
        props.openDrawer(false);
      }}
    >
      {props.epsLoading ? <CircularProgress sx={{ color: "#02135b" }} /> : icon}
    </StyledFab>
  );
};
