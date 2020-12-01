import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { QueryParams, Update } from '../interfaces';
import { StoreService } from '../state/store.service';
import { DataService } from './data.service';


@Injectable()
export class EntityCollectionService<T> {

  constructor(private readonly dataService: DataService<T>, private storeService: StoreService<T>) { }

  entityStore(entityName: string): Observable<T[]> {
    return this.storeService.entityStore(entityName);
  }

  add(entityName: string, entity: T): Observable<T> {
    return this.dataService.add(entityName, entity).pipe(tap(() => this.storeService.upsertEntity(entityName, entity)));
  }

  delete(entityName: string, key: number | string): Observable<number | string> {
    return this.dataService.delete(entityName, key).pipe(tap(() => this.storeService.deleteEntity(entityName, key)));
  }

  getAll(entityName: string): Observable<T[]> {
    return this.dataService.getAll(entityName).pipe(
      tap(list => this.storeService.emit(entityName, list))
      );
  }

  getById(entityName: string, key: number | string): Observable<T> {
    return this.dataService.getById(entityName, key);
  }

  getWithQuery(entityName: string, queryParams: QueryParams | string): Observable<T[]> {
    return this.dataService.getWithQuery(entityName, queryParams).pipe(tap(list => this.storeService.emit(entityName, list)));
  }

  update(entityName: string, update: Update<T>): Observable<T> {
    return this.dataService.update(entityName, update).pipe(tap(() => this.storeService.upsertEntity(entityName, update)));
  }

  // Important! Only call if the backend service supports upserts as a POST to the target URL
  upsert(entityName: string, entity: T): Observable<T> {
    return this.dataService.upsert(entityName, entity).pipe(tap(() => this.storeService.upsertEntity(entityName, entity)));
  }
}
