export function normalizeColor(color: string): string {
  const div = document.createElement('div');
  div.style.color = color;
  document.body.appendChild(div);
  const computedColor = getComputedStyle(div).color;
  document.body.removeChild(div);

  return rgbToHex(computedColor);
}

export function rgbToHex(rgb: string): string {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return rgb;

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function isValidHexColor(hex: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

export function colorsMatch(color1: string, color2: string): boolean {
  try {
    return (
      normalizeColor(color1).toLowerCase() ===
      normalizeColor(color2).toLowerCase()
    );
  } catch {
    return false;
  }
}
