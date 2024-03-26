import React from "react";
import { Navigate } from "react-router";

import { Box, Container } from "@mui/material";
import Logo from "../components/Logo";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supabase";
import { useSession } from "../services/api";

export default function Login() {
  const session = useSession();
  // Navigate back to the home page on login.
  if (session) {
    return <Navigate to="/home/about" replace />;
  }

  return (
    <Box className="fullscreen-no-toolbar" display="flex" alignItems="center" padding={1}>
      <Container>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Logo />
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />
        </Box>
      </Container>
    </Box>
  );
}
