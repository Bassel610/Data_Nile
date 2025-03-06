import { Box, Typography, IconButton, Stack } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette"; // Color picker icon

const MangeLayout = ({ colorPalette, selectedColors, onColorChange }) => {
  return (
    <Box sx={{ textAlign: "center", mt: 3, display: 'flex', width: '100%', flexWrap: 'wrap', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>🎨 Customize Your Theme</Typography>
      <Stack justifyContent='center' direction='row' flexWrap="wrap">
        {Object.keys(colorPalette).map((variable) => (
          <Stack width='350px' key={variable} sx={{ mb: 3 }}>
            <Typography variant="body1">{variable.replace("--", "").replace("-", " ")}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mt: 1 }}>
              {colorPalette[variable].map((color) => (
                <Box
                  key={color}
                  onClick={() => onColorChange(variable, color)}
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: color,
                    cursor: "pointer",
                    border: selectedColors[variable] === color ? "3px solid white" : "2px solid transparent",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.2)" },
                  }}
                />
              ))}
              <IconButton component="label">
                <PaletteIcon />
                <input
                  type="color"
                  style={{ display: "none" }}
                  onChange={(e) => onColorChange(variable, e.target.value)}
                />
              </IconButton>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default MangeLayout;
