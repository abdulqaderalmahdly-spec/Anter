/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * This theme is based on the "Smart Solutions" visual identity.
 */

import { Platform } from 'react-native';

// --- Smart Solutions Color Palette ---
const primaryBlue = '#007AFF'; // Primary Blue for Smart Solutions (Buttons, Icons)
const accentBlue = '#00CFFF';  // Accent Blue (Glow, Active elements)
const backgroundWhite = '#FFFFFF'; // Clean White
const surfaceGray = '#F5F5F5';    // Light Gray (Input fields, message bubbles)
const textPrimary = '#1A1A1A';      // Primary Text Color (Near Black)
const errorRed = '#FF3B30';      // Standard Error/Alert Color

// --- Theme Configuration ---
export const Colors = {
  light: {
    // Smart Solutions Palette
    primary: primaryBlue,
    accent: accentBlue,
    background: backgroundWhite,
    surface: surfaceGray,
    text: textPrimary,
    error: errorRed,

    // Existing theme variables (adapted)
    tint: primaryBlue,
    icon: textPrimary,
    tabIconDefault: surfaceGray,
    tabIconSelected: primaryBlue,
  },
  dark: {
    // Dark mode adaptation (maintaining contrast and brand identity)
    primary: primaryBlue,
    accent: accentBlue,
    background: '#121212', // Darker background for contrast
    surface: '#1E1E1E',    // Dark surface for cards/inputs
    text: '#E0E0E0',      // Light text
    error: errorRed,

    // Existing theme variables (adapted)
    tint: accentBlue,
    icon: '#E0E0E0',
    tabIconDefault: '#424242',
    tabIconSelected: accentBlue,
  },
};

// --- Typography Configuration ---
// Note: Custom fonts like 'Inter' or 'Tajawal' need to be loaded separately in the Expo project.
// This configuration provides placeholders and system defaults.
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui', // Placeholder for Inter/Roboto (English)
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
    // Recommendation for Arabic: Use a modern, clean font like 'Tajawal' or 'Vazirmatn'
    arabic: 'system-ui', // Placeholder for Arabic font
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
    arabic: 'normal',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    arabic: "'Tajawal', 'Vazirmatn', sans-serif", // Web-safe Arabic font suggestion
  },
});
