// ng g interface ./models/Flight
export interface Flight {
  id: number;
  flightNumber: string;
  departureAirportCode: string;
  arrivalAirportCode: string;
  dateAndTimeOfDeparture: Date;
  dateAndTimeOfArrival: Date;
  delay: boolean;
  price: number;
}
