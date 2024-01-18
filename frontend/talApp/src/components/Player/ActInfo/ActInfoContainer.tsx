import { useState } from "react";
import Box from "@mui/material/Box";
import { ActDivider } from "./ActDivider";
import { EqualizerGraphics } from "./EqualizerGraphics";
import { ActPlayPauseIcon } from "./ActPlayPauseIcon";
import ListItemButton from "@mui/material/ListItemButton";
import { ActTitle } from "./ActTitle";
import { ActExpandButton } from "./ActExpandButton";
import { ActDescriptionCollapse } from "./ActDescriptionCollapse";

export interface ActContainerProps {
  actNumber: number;
  showEq: boolean;
  paused: boolean;
  actPlaying: number;
  actTimestamp: number;
  playPauseHandler: () => void;
  actHandler: (timeStamp: number) => void;
  actName: string;
  actDescription: string;
}
export const ActInfoContainer = (props: ActContainerProps) => {
  const [open, setOpen] = useState(false);

  const openDescriptionHandler = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <ActDivider actNumber={props.actNumber} />
      <ListItemButton>
        <ActPlayPauseIcon
          actPlaying={props.actPlaying}
          actNumber={props.actNumber}
          actTimestamp={props.actTimestamp}
          playPauseHandler={props.playPauseHandler}
          actHandler={props.actHandler}
          paused={props.paused}
        />

        <EqualizerGraphics
          showEq={props.showEq}
          actPlaying={props.actPlaying}
          actNumber={props.actNumber}
          paused={props.paused}
        />

        <ActTitle
          actName={props.actName}
          openDescriptionHandler={openDescriptionHandler}
        />

        <ActExpandButton
          open={open}
          openDescriptionHandler={openDescriptionHandler}
        />
      </ListItemButton>

      <ActDescriptionCollapse open={open} summary={props.actDescription} />
    </Box>
  );
};

// import { useState } from "react"
// import Box  from "@mui/material/Box"
// import { ActDivider } from "./ActDivider"
// import { EqualizerGraphics } from "./EqualizerGraphics"
// import { ActPlayPauseIcon } from "./ActPlayPauseIcon"
// import ListItemButton from "@mui/material/ListItemButton"
// import { ActTitle } from "./ActTitle"
// import { ActExpandButton } from "./ActExpandButton"
// import { ActDescriptionCollapse } from "./ActDescriptionCollapse"
// export interface ActContainerProps{
// actNumber: number
// showEq: boolean
// paused: boolean
// actPlaying: number
// actTimestamp: number;
// playPauseHandler: () => void;
// actHandler: (timeStamp: number) => void;
// actName: string;
// actDescription: string;
//   // openDescriptionHandler: () => void;

// }
// export const ActInfoContainer = (props: ActContainerProps) => {
//   const [open, setOpen] = useState(false)

//   const openDescriptionHandler = ()=>{
//     setOpen(!open)
//   }
//     return (
//         <>
//                  <ActDivider actNumber={props.actNumber} />
//                   <ListItemButton>
//                     <ActPlayPauseIcon
//                       actPlaying= {props.actPlaying}
//                       actNumber= {props.actNumber}
//                       actTimestamp= {props.actTimestamp}
//                       playPauseHandler={props.playPauseHandler}
//                       actHandler={props.actHandler}
//                       paused = {props.paused}
//                     />
//                   {/* //   <ListItemIcon sx={{ margin: 0, justifyContent: "center" }}>
//                   //     <IconButton
//                   //       onClick={() =>
//                   //         actPlaying == act.number
//                   //           ? playPauseHandler()
//                   //           : actHandler(act.timestamp)
//                   //       }
//                   //     >
//                   //       {actPlaying == act.number && !paused ? (
//                   //         <PauseCircleIcon />
//                   //       ) : (
//                   //         <PlayCircleIcon />
//                   //       )}
//                   //     </IconButton>
//                   //   </ListItemIcon> */}
//                     <EqualizerGraphics
//                       showEq={props.showEq}
//                       actPlaying={props.actPlaying}
//                       actNumber={props.actNumber}
//                       paused={props.paused}
//                     />
//                     {/* <Box
//                       sx={{
//                         height: "20px",
//                         width: "25px",
//                         display: "flex",
//                         alignItems: "flex-end",
//                       }}
//                     >
//                       {showEq && actPlaying == act.number && !paused ? (
//                         <>
//                           <Box
//                             sx={{
//                               "@keyframes eqalizer": equalizerKeyFrames,
//                               width: "2px",
//                               height: "100%",
//                               background: "#1dd05d",
//                               borderRadius: "2px",
//                               margin: "0 1px",
//                               animation: `eqalizer ${Math.floor(
//                                 Math.random() * (6 - 2) + 2
//                               )}s steps(20, end) infinite;`,
//                             }}
//                           />
//                           <Box
//                             sx={{
//                               "@keyframes eqalizer": equalizerKeyFrames,
//                               width: "2px",
//                               height: "100%",
//                               background: "#1dd05d",
//                               borderRadius: "2px",
//                               margin: "0 1px",
//                               animation: `eqalizer ${Math.floor(
//                                 Math.random() * (6 - 2) + 2
//                               )}s steps(20, end) infinite;`,
//                             }}
//                           />
//                           <Box
//                             sx={{
//                               "@keyframes eqalizer": equalizerKeyFrames,
//                               width: "2px",
//                               height: "100%",
//                               background: "#1dd05d",
//                               borderRadius: "2px",
//                               margin: "0 1px",
//                               animation: `eqalizer ${Math.floor(
//                                 Math.random() * (6 - 2) + 2
//                               )}s steps(20, end) infinite;`,
//                             }}
//                           />
//                           <Box
//                             sx={{
//                               "@keyframes eqalizer": equalizerKeyFrames,
//                               width: "2px",
//                               height: "100%",
//                               background: "#1dd05d",
//                               borderRadius: "2px",
//                               margin: "0 1px",
//                               animation: `eqalizer ${Math.floor(
//                                 Math.random() * (6 - 2) + 2
//                               )}s steps(20, end) infinite;`,
//                             }}
//                           />
//                         </>
//                       ) : (
//                         ""
//                       )}
//                     </Box> */}
//                     {/* <Box>
//                     <Typography variant="caption" noWrap>
//                       {act.number != 0 ? `Act ${act.number}` : `Prologue`}
//                     </Typography>
//                   </Box> */}

// <ActTitle actName = {props.actName}
//   openDescriptionHandler={openDescriptionHandler} />
//                     {/* <ListItemText
//                       onClick={handleClick}
//                       primary={act.name.substring(act.name.indexOf(":") + 1)}
//                     /> */}
//                     {/* {open ? (
//                       <ExpandLess onClick={openDescriptionHandler} />
//                     ) : (
//                       <ExpandMore onClick={openDescriptionHandler} />
//                     )} */}
//                     <ActExpandButton open = {open} openDescriptionHandler={openDescriptionHandler}/>
//                   </ListItemButton>

//                   {/* <Collapse in={open} timeout="auto" unmountOnExit>
//                     <List component="div" disablePadding>
//                       <ListItemText>{act.summary}</ListItemText>
//                     </List>
//                   </Collapse> */}
//                 </>,
//                 <ActDescriptionCollapse open= {open} summary={props.actDescription}
//               ];
//               // return [
//               //   <Typography
//               //     onClick={() => actHandler(act.timestamp)}
//               //     fontWeight={400}
//               //     data-timestamp={act.timestamp}
//               //     data-actNum={act.number}
//               //   >
//               //     <b>{act.name}</b>
//               //   </Typography>,
//               //   <Typography>{act.summary}</Typography>,
//               // ];
//             })}

//           </Box>
//     )
// }
