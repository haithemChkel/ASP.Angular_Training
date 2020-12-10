// ********************************************************
// ************ DO NOT USE IN PRODUCTION ******************
// ********************************************************

import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { EmitEvent } from '../interfaces';


@Injectable()
export class EventBusService {

  private readonly subject$ = new Subject<any>();

  emit<K>(event: EmitEvent<K>): void {
    console.log('emit', event);
    this.subject$.next(event);
  }

  on<K>(event: string, action?: (v: K)  => void): Observable<K> {
    return this.subject$.pipe(
      filter((e: EmitEvent<K>) => e.name === event),
      map((e: EmitEvent<K>) => e.value),
      tap(action),
    );
  }
}
