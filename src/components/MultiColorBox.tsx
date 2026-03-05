import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material/Box"; // is a type definition of everything you can pass to :

interface MultiColorBoxProps extends BoxProps {
  hexValue: string[];
}

const MultiColorBox = ({ hexValue, sx, ...rest }: MultiColorBoxProps) => {
  if (!hexValue?.length) return null;

  const background =
    hexValue.length === 1
      ? hexValue[0]
      : `linear-gradient(45deg, ${hexValue.join(", ")})`;

  return (
    <Box
      sx={{
        height: 24,
        width: 24,
        borderRadius: "50%",
        background,
        border: "1px solid #ccc",
        ...sx,
      }}
      {...rest}
    />
  );
};

export default MultiColorBox;