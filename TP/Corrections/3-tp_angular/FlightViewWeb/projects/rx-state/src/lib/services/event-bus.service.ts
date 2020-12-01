import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { EmitEvent } from '../interfaces';


@Injectable()
export class EventBusService<K> {

  private readonly subject$ = new Subject<EmitEvent<K>>();

  emit(event: EmitEvent<K>): void {
    this.subject$.next(event);
  }

  on(event: string, action?: (v: K)  => void): Observable<K> {
    return this.subject$.pipe(
      filter((e: EmitEvent<K>) => e.name === event),
      map((e: EmitEvent<K>) => e.value),
      tap(action)
    );
  }
}
