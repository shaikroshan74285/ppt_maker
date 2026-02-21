/************************************************************
 * PRABHAS PPT MAKER - Professional Template Engine
 * Clean, modern slide designs with consistent styling
 ************************************************************/

// ========== COLOR PALETTES ==========
// Professional color combinations
const COLOR_PALETTES = [
  { primary: "1E40AF", secondary: "3B82F6", accent: "93C5FD", light: "DBEAFE", dark: "1E3A8A" }, // Blue
  { primary: "047857", secondary: "10B981", accent: "6EE7B7", light: "D1FAE5", dark: "064E3B" }, // Emerald
  { primary: "7C3AED", secondary: "8B5CF6", accent: "C4B5FD", light: "EDE9FE", dark: "5B21B6" }, // Purple
  { primary: "DC2626", secondary: "EF4444", accent: "FCA5A5", light: "FEE2E2", dark: "991B1B" }, // Red
  { primary: "D97706", secondary: "F59E0B", accent: "FCD34D", light: "FEF3C7", dark: "92400E" }, // Amber
  { primary: "0891B2", secondary: "06B6D4", accent: "67E8F9", light: "CFFAFE", dark: "155E75" }, // Cyan
  { primary: "BE185D", secondary: "EC4899", accent: "F9A8D4", light: "FCE7F3", dark: "831843" }, // Pink
  { primary: "4F46E5", secondary: "6366F1", accent: "A5B4FC", light: "E0E7FF", dark: "3730A3" }, // Indigo
];

let paletteIndex = 0;

function getNextPalette() {
  const palette = COLOR_PALETTES[paletteIndex % COLOR_PALETTES.length];
  paletteIndex++;
  return palette;
}

function resetColors() {
  paletteIndex = Math.floor(Math.random() * COLOR_PALETTES.length);
}

// Random color generator for dynamic template colors
// Rainbow-style distinct colors (no similar shades)
const RAINBOW_COLORS = [
  "3B82F6", // Blue
  "10B981", // Green
  "F59E0B", // Orange/Amber
  "06B6D4", // Cyan/Teal
  "8B5CF6", // Purple
  "EF4444", // Red
  "84CC16", // Lime/Yellow-Green
  "EC4899", // Pink
  "14B8A6", // Teal
  "F97316"  // Orange
];

let lastColorIndex = -1;

function randColor() {
  // Get a random color that is different from the last one
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * RAINBOW_COLORS.length);
  } while (newIndex === lastColorIndex && RAINBOW_COLORS.length > 1);

  lastColorIndex = newIndex;
  return RAINBOW_COLORS[newIndex];
}

// Export for global access
window.resetColors = resetColors;
window.randColor = randColor;
window.getNextPalette = getNextPalette;

// ========== TEMPLATE REGISTRY ==========
window.AI_TEMPLATES = {};

// Template Locations (Metadata for reference)
window.TEMPLATE_LOCATIONS = [
  { id: 1, name: "HERO_IMAGE_TITLE", file: "temp1.js" },
  { id: 2, name: "LEFT_TITLE_FEATURE_CARDS", file: "temp2.js" },
  { id: 3, name: "PROCESS_VERTICAL_STACK", file: "temp3.js" },
  { id: 4, name: "IMAGE_LEFT_BULLETS_RIGHT", file: "temp4.js" },
  { id: 5, name: "GRID_REQUIREMENTS", file: "temp5.js" },
  { id: 6, name: "FULL_BG_TEXT_OVERLAY", file: "temp6.js" },
  { id: 7, name: "VALUE_CHAIN_FLOW", file: "temp7.js" },
  { id: 8, name: "TEXT_LEFT_IMAGE_RIGHT", file: "temp8.js" },
  { id: 9, name: "SOLUTION_CARDS_GRID", file: "temp9.js" },
  { id: 10, name: "BLOG_CARDS_LAYOUT", file: "temp10.js" },
  { id: 11, name: "INSTALLATION_STEPS_CARDS", file: "temp11.js" },
  { id: 12, name: "ZIGZAG_PROCESS_STEPS", file: "temp12.js" },
  { id: 13, name: "TEXT_LEFT_IMAGE_RIGHT_ALT", file: "temp13.js" },
  { id: 14, name: "TITLE_SPLIT_BAND", file: "temp14.js" },
  { id: 15, name: "TITLE_MINIMAL_ACCENT", file: "temp15.js" },
  { id: 16, name: "TITLE_DUOTONE_FRAME", file: "temp16.js" },
  { id: 17, name: "CONCLUSION_SINGLE_SPOTLIGHT", file: "temp17.js" },
  { id: 18, name: "CONCLUSION_SINGLE_QUOTE", file: "temp18.js" },
  { id: 19, name: "CONCLUSION_SINGLE_METRIC", file: "temp19.js" },
  { id: 20, name: "CONCLUSION_MULTI_CHECKLIST", file: "temp20.js" },
  { id: 21, name: "CONCLUSION_MULTI_PILLARS", file: "temp21.js" },
  { id: 22, name: "CONCLUSION_MULTI_SUMMARY_GRID", file: "temp22.js" },
  { id: 23, name: "DIFFERENCE_SPLIT_CHEVRON", file: "temp23.js" },
  { id: 24, name: "PROS_CONS_BALANCE_CARDS", file: "temp24.js" },
  { id: 25, name: "ADV_DISADV_TIMELINE", file: "temp25.js" },
  { id: 26, name: "DIFFERENCE_DUAL_COLUMN_BANDS", file: "temp26.js" },
  { id: 27, name: "SINGLELINE_FOCUS_QUOTE", file: "temp27.js" },
  { id: 28, name: "SINGLELINE_CENTER_STATEMENT", file: "temp28.js" },
  { id: 29, name: "SINGLELINE_BANNER_IMAGE", file: "temp29.js" },
  { id: 30, name: "SINGLELINE_ACCENT_BLOCK", file: "temp30.js" },
  { id: 31, name: "SINGLELINE_MINIMAL_FRAME", file: "temp31.js" },
  { id: 32, name: "MULTIPOINT_NUMBERED_PATH", file: "temp32.js" },
  { id: 33, name: "MULTIPOINT_ICON_GRID", file: "temp33.js" },
  { id: 34, name: "MULTIPOINT_STAGGERED_CARDS", file: "temp34.js" },
  { id: 35, name: "MULTIPOINT_LEFT_RAIL_LIST", file: "temp35.js" },
  { id: 36, name: "MULTIPOINT_TWO_COLUMN_BULLETS", file: "temp36.js" }
];

console.log("Prabhas PPT Maker - Template Engine (Registry & Colors) loaded ✅");
