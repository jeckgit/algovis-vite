function hexColorToFloatColor(hex: string) {
  return [
    parseInt(hex.substring(0, 2), 16) / 255,
    parseInt(hex.substring(2, 4), 16) / 255,
    parseInt(hex.substring(4, 6), 16) / 255
  ];
}

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function floatColorToHex(colorVals: number[]) {
  const colors = colorVals.map((val) => componentToHex(Math.floor(val * 255)));
  return `#${colors[0]}${colors[1]}${colors[2]}`;
}

function lerp(colors: number[][], value: number) {
  // linear interpolation
  return [
    colors[0][0] + (colors[1][0] - colors[0][0]) * value,
    colors[0][1] + (colors[1][1] - colors[0][1]) * value,
    colors[0][2] + (colors[1][2] - colors[0][2]) * value
  ];
}

export function getColors(colorsNum = 5, startColor = '#000000', endColor = '#FFFFFF') {
  // normalize colors
  // 255 = 1, 0 = 0
  const colorOne = hexColorToFloatColor(startColor.slice(1, 7));
  const colorTwo = hexColorToFloatColor(endColor.slice(1, 7));
  const steps = colorsNum - 1;

  const colors = [];
  for (let i = 0; i <= steps; i++) {
    const calcColor = lerp([colorOne, colorTwo], i / steps);
    colors.push(floatColorToHex(calcColor));
  }

  return colors;
}
