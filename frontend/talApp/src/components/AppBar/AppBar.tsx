import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import { FloatingButton } from "./FloatingButton";

export interface NavProps {
  action: (open: boolean) => void;
  epsLoading: boolean;
}

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
          <FloatingButton action={props.action} epsLoading={props.epsLoading} />
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </>
  );
}
