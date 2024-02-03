import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

export interface ActDividerProps {
  actNumber: number;
}
export const ActDivider = (props: ActDividerProps) => {
  return (
    <Divider>
      <Chip
        sx={{ display: { xs: "none", sm: "block" } }}
        label={props.actNumber != 0 ? `Act ${props.actNumber}` : `Prologue`}
        size="small"
      />
    </Divider>
  );
};
