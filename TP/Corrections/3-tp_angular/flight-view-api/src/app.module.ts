import { Module } from '@nestjs/common';
import { AirportController } from './airport.controller';
import { AirportService } from './airport.service';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';

@Module({
  imports: [],
  controllers: [FlightController, AirportController],
  providers: [FlightService, AirportService],
})
export class AppModule { }
