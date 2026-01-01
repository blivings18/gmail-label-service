import { createTheme } from "@mui/material/styles";
import "@mui/x-data-grid/themeAugmentation";

const slateTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3c9ea8",
    },
    text: {
      primary: "#020617",
      secondary: "#94a3b8",
    },
    divider: "#334155",
  },

  typography: {
    fontFamily: `"Inter", "ui-sans-serif", system-ui`,
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f9fafb",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1f2937",
          borderBottom: "1px solid #1e293b",
          boxShadow: "none",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffffff",
          border: "1px solid #1e293b",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "6px 14px",
        },
        outlined: {
          borderColor: "#334155",
          color: "#e2e8f0",
          "&:hover": {
            backgroundColor: "#1e293b",
            borderColor: "#475569",
          },
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.08)",
        },

        columnHeader: {
          backgroundColor: "#1e293b",
          color: "#ffffff",
        },

        columnHeaderTitle: {
          fontWeight: 900,
          textTransform: "uppercase",
          fontSize: "1rem",
        },
        row: {
          backgroundColor: "#f9fafb",
          "&:hover": {
            backgroundColor: "#f3f4f6",
            cursor: "pointer",
          },
        },
        cell: {
          borderBottom: "1px solid #e5e7eb",
        },
      },
    },
  },
});

export default slateTheme;
