import ListItemText from "@mui/material/ListItemText";

export interface ListTitleProps {
  actName: string;
  openDescriptionHandler: () => void;
}
export const ActTitle = (props: ListTitleProps) => {
  return (
    <ListItemText
      onClick={props.openDescriptionHandler}
      primary={props.actName.substring(props.actName.indexOf(":") + 1)}
    />
  );
};
