import { styled } from "@mui/material/styles";

export interface CoverImageProps {
  imgSrc: string;
}

export const CoverImage = (props: CoverImageProps) => {
  const CoverImageElement = styled("div")({
    width: 100,
    height: 100,
    objectFit: "cover",
    overflow: "hidden",
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.08)",
    "& > img": {
      width: "100%",
    },
  });

  return (
    <CoverImageElement sx={{ transform: "scaleX(-1)" }}>
      <img
        alt="This American Life Flag Speech Bubble Icon"
        src={props.imgSrc}
      />
    </CoverImageElement>
  );
};
