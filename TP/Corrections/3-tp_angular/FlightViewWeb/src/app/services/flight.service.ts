import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Flight } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private readonly apiUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) { }

  findAll(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }

  findOne(flightId: number): Observable<Flight> {
    console.log('call : ', this.apiUrl);
    return this.http.get<Flight>(`${this.apiUrl}/${flightId}`);
  }

  create(flight: Flight): Observable<number> {
    console.log('call create with :', flight);
    return this.http.post<number>(`${this.apiUrl}`, flight);
  }

  update(flight: Flight): Observable<Flight> {
    return this.http.put<Flight>(`${this.apiUrl}/${flight.id}`, flight);
  }

  delete(flightId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${flightId}`);
  }
}
