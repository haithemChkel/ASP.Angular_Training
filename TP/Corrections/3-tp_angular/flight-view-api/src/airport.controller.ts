import { Controller, Get, Param } from '@nestjs/common';
import { AirportService } from './airport.service';
import { Airport } from './models/airport';

@Controller('airport')
export class AirportController {
  constructor(private readonly airportService: AirportService) { }

  @Get()
  findAll(): Airport[] {
    return this.airportService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id') id: string): Airport {
    return this.airportService.findOne(id);
  }
}
