// components/GoogleAuthGuard.tsx
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";

interface GoogleAuthGuardProps {
  children: ReactNode;
}

const GoogleAuthGuard: React.FC<GoogleAuthGuardProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get<{ authorized: boolean }>(
          "http://localhost:8080/api/v1/google/oauth/status",
          { withCredentials: true }
        );

        if (!res.data.authorized) {
          // Redirect to backend authorize endpoint with current URL
          const currentUrl = window.location.href;
          window.location.href = `http://localhost:8080/api/v1/google/oauth/authorize?redirect=${encodeURIComponent(
            currentUrl
          )}`;
        }
      } catch (err) {
        console.error("Error checking Google OAuth status", err);
        setErrorMessage("Failed to verify Google authorization");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (errorMessage) {
    return (
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    );
  }

  return <>{children}</>;
};

export default GoogleAuthGuard;
