function generateGradient(startHex, endHex, numColors) {
  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return [r, g, b]
  }

  function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  }

  const startRgb = hexToRgb(startHex)
  const endRgb = hexToRgb(endHex)

  const gradientColors = []
  for (let i = 0; i < numColors; i++) {
    const r = Math.round(startRgb[0] + (i * (endRgb[0] - startRgb[0])) / (numColors - 1))
    const g = Math.round(startRgb[1] + (i * (endRgb[1] - startRgb[1])) / (numColors - 1))
    const b = Math.round(startRgb[2] + (i * (endRgb[2] - startRgb[2])) / (numColors - 1))
    gradientColors.push(rgbToHex(r, g, b))
  }

  return gradientColors
}

export default generateGradient;