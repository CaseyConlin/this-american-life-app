import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { FloatingButton } from "./FloatingButton";
import { IconButton } from "@mui/material";

export interface NavProps {
  getEpisodes: () => void;
  epsLoading: boolean;
  openAppDrawer: (open: boolean) => void;
  setDrawerContents: (set: "auth" | "episodes" | undefined) => void;
  contentsLoading: "auth" | "episodes" | undefined;
}

export default function BottomAppBar(props: NavProps) {
  return (
    <AppBar
      // position="fixed"
      position="sticky"
      sx={{
        top: "auto",
        bottom: 0,
        zIndex: "10",

        background: "transparent",
        boxShadow: "none",
        bgcolor: "#ea0001",
        // height: "10vh",
        width: "100vw",
      }}
    >
      <Toolbar
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignContent: "flex-end",
          m: 0.75,
          gap: "15px",
          flexWrap: "wrap",
          bgcolor: "#ea0001",
          height: "20px",
        }}
      >
        <FloatingButton
          // action={props.action}
          action={props.setDrawerContents}
          epsLoading={props.epsLoading}
          contentsLoading={props.contentsLoading}
          menu="auth"
          openAppDrawer={props.openAppDrawer}
        />
        <FloatingButton
          epsLoading={props.epsLoading}
          menu="episodes"
          getEpisodes={props.getEpisodes}
          action={props.setDrawerContents}
          contentsLoading={props.contentsLoading}
          openAppDrawer={props.openAppDrawer}
        />
        {/* <IconButton>
            <ArrowDropUpIcon sx={{ color: "#fff" }} />
          </IconButton> */}

        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}
