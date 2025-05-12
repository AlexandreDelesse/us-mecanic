import { Box } from "@mui/material";
import logoLoader from "../../Assets/Images/logo-loader.gif";

export default function LogoLoader() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <img width={250} src={logoLoader} alt="logo qui tourne" />
    </Box>
  );
}
