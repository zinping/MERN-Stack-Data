import { useState } from "react";
import { Link } from "react-router-dom";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  console.log('navbar palette: ', { palette })

  // initial selected page is "dashboard"
  const [selected, setSelected] = useState("dashboard");
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <AnalyticsIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          FinForecast
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE with pseudo selector */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/forecasts"
            onClick={() => setSelected("forecasts")}
            style={{
              color: selected === "forecasts" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Forecasts
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
