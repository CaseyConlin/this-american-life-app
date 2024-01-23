// import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

// import IconButton from "@mui/material/IconButton";
// import Fab from "@mui/material/Fab";

// import MenuIcon from "@mui/icons-material/Menu";

// import SearchIcon from "@mui/icons-material/Search";
// import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FloatingButton } from "./FloatingButton";

export interface NavProps {
  // openDrawer: React).MouseEventHandler<HTMLButtonElement>;
  action: (open: boolean) => void;
  epsLoading: boolean;
}
// const StyledFab = styled(Fab)({
//   position: "absolute",
//   zIndex: 1,
//   top: -30,
//   left: 0,
//   right: 0,
//   margin: "0 auto",
// });

export default function BottomAppBar(props: NavProps) {
  return (
    <>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          zIndex: "10",
          bgcolor: "#ea0001",
          height: "40px",
        }}
      >
        <Toolbar sx={{ bgcolor: "#ea0001", height: "20px" }}>
          {/* <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton> */}
          <FloatingButton action={props.action} epsLoading={props.epsLoading} />
          {/* <StyledFab
            color="secondary"
            aria-label="add"
            onClick={() => props.openDrawer()}
          >
            <PlaylistPlayIcon />
          </StyledFab> */}
          <Box sx={{ flexGrow: 1 }} />
          {/* <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </>
  );
}
