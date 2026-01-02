import { createTheme } from "@mui/material/styles";
import "@mui/x-data-grid/themeAugmentation";

const slate = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5f5",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a",
};

const brand = {
  main: "#3c9ea8",
  mainHover: "#2b7f87",
};

const slateTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: slate[900] },
    secondary: { main: brand.main },
    text: {
      primary: slate[900],
      secondary: slate[400],
    },
    divider: slate[200],
    background: {
      default: slate[50],
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily: `"Inter", system-ui, sans-serif`,
    h6: { fontWeight: 600 },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  shape: { borderRadius: 10 },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: slate[50] },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: slate[900],
          color: slate[50],
          border: "none",

          "& .MuiButton-root": {
            color: slate[300],
            padding: "6px 14px",
            borderRadius: 0,

            "&.active": {
              color: "#ffffff",
              borderBottom: `2px solid ${brand.main}`,
            },

            "&:hover": {
              color: brand.main,
              backgroundColor: "transparent",
            },
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          border: `1px solid ${slate[200]}`,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "6px 14px",
        },
        text: {
          color: slate[200],
          "&:hover": {
            backgroundColor: slate[800],
          },
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          border: `1px solid ${slate[200]}`,
          boxShadow:
            "0 1px 3px rgba(15,23,42,0.08), 0 1px 2px rgba(15,23,42,0.04)",
          backgroundColor: "#ffffff",
        },

        columnHeader: {
          backgroundColor: slate[900],
          color: slate[100],

          "& .MuiDataGrid-iconButtonContainer": {
            marginLeft: 8,
          },

          "& .MuiIconButton-root": {
            backgroundColor: "transparent",
            padding: 4,
            borderRadius: "50%",

            "&:hover": {
              backgroundColor: "transparent",
            },
          },

          "& .MuiDataGrid-sortIcon": {
            color: brand.main,
            opacity: 1,
            fontSize: "1.1rem",
            transition: "color 0.2s ease",

            "&:hover": {
              color: brand.mainHover,
            },
          },
        },

        columnHeaderTitle: {
          fontWeight: 700,
          textTransform: "uppercase",
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
        },

        columnHeaderTitleContainer: {
          gap: 8,
        },

        row: {
          backgroundColor: slate[50],
          "&:hover": {
            backgroundColor: slate[100],
            cursor: "pointer",
          },
        },

        cell: {
          borderBottom: `1px solid ${slate[200]}`,
        },
      },
    },
  },
});

export default slateTheme;
