import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

export interface ActDescriptionProps {
  open: boolean;
  summary: string;
}

export const ActDescriptionCollapse = (props: ActDescriptionProps) => {
  return (
    <Collapse in={props.open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <p dangerouslySetInnerHTML={{ __html: props.summary }} />
      </List>
    </Collapse>
  );
};
