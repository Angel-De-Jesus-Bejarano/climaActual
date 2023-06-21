export function convertMetersPerSecondToKilometersPerHour(speedInMetersPerSecond: number): string {
    return `${Math.round(speedInMetersPerSecond * 3.6)} km/h`;
  }