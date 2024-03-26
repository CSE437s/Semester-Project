/* Landing.jsx
Pretty landing for site, directs to login/register
*/
import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleEnterClick = () => {
    navigate("/login"); // Redirect to the Login page when the button is clicked
  };

  return (
    <Box className="fullscreen-no-toolbar" display="flex" alignItems="center" padding={1}>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Logo scale={0.4} />
          <Typography variant="h1" textAlign="center">
            Welcome to Article26!
          </Typography>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ marginTop: 3 }}
            onClick={handleEnterClick}
          >
            Enter
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
