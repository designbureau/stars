const getTemperature = ( spectraltype = "F") => {
  let temperature;
  switch (spectraltype) {
    case "M":
      temperature = 3000;
      break;
    case "K":
      temperature = 4500;
      break;
    case "G":
      temperature = 5500;
      break;
    case "F":
      temperature = 6500;
      break;
    case "A":
      temperature = 8000;
      break;
    case "B":
      temperature = 20000;
      break;
    case "O":
      temperature = 40000;
      break;
    default:
      temperature = 6500;
      break;
  }
  return temperature;
};

export default getTemperature;