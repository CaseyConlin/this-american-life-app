import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export interface ActExpandProps {
  open: boolean;
  openDescriptionHandler: () => void;
}
export const ActExpandButton = (props: ActExpandProps) => {
  return (
    <>
      {props.open ? (
        <ExpandLess onClick={props.openDescriptionHandler} />
      ) : (
        <ExpandMore onClick={props.openDescriptionHandler} />
      )}
    </>
  );
};
