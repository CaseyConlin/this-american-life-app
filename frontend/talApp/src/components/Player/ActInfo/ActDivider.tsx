import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

export interface ActDividerProps {
  actNumber: number;
}
export const ActDivider = (props: ActDividerProps) => {
  return (
    <Divider>
      <Chip
        label={props.actNumber != 0 ? `Act ${props.actNumber}` : `Prologue`}
        size="small"
      />
    </Divider>
  );
};
