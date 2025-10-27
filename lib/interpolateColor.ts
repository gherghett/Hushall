/**
 * Interpolates between two colors based on a value from 0 to 1
 * @param color1 - Starting color in hex format (e.g., "#FF0000")
 * @param color2 - Ending color in hex format (e.g., "#00FF00")
 * @param value - Interpolation value between 0 and 1
 * @returns Interpolated color in hex format
 */
export default function interpolateColor(
  color1: string,
  color2: string,
  value: number
): string {
  // Clamp value between 0 and 1
  const t = Math.max(0, Math.min(1, value));

  // Parse hex colors
  const parseHex = (hex: string) => {
    const cleanHex = hex.replace("#", "");
    return {
      r: parseInt(cleanHex.substr(0, 2), 16),
      g: parseInt(cleanHex.substr(2, 2), 16),
      b: parseInt(cleanHex.substr(4, 2), 16),
    };
  };

  const rgb1 = parseHex(color1);
  const rgb2 = parseHex(color2);

  // Interpolate each color component
  const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * t);
  const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * t);
  const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * t);

  // Convert back to hex
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
