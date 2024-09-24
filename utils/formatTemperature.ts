export const formatTemperature = (
  kelvin: number,
  isCelsius: boolean
): string => {
  const temp = isCelsius ? kelvin - 273.15 : (kelvin - 273.15) * 1.8 + 32;
  return Math.round(temp).toString();
};
