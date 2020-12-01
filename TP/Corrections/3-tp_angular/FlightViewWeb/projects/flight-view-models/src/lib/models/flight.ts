
export class Flight {
  id: number;
  flightNumber: string;
  departureAirportCode: string;
  arrivalAirportCode: string;
  dateAndTimeOfDeparture: Date;
  dateAndTimeOfArrival: Date;
  delay: boolean;
  price: number;
}
