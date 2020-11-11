import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FlightService } from './flight.service';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) { }

  @Get()
  findAll(): any {
    return this.flightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): any {
    return this.flightService.findOne(id);
  }

  @Post()
  create(@Body() flight: any): number {
    return this.flightService.create(flight);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() flight: any): any {
    console.log('id = ', id);
    if (this.flightService.exist(Number(id))) {
      return this.flightService.update(flight)
    } else {
        return undefined;
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number): boolean {
    console.log('delete id = ', id);
    return this.flightService.delete(Number(id));
  }

}
