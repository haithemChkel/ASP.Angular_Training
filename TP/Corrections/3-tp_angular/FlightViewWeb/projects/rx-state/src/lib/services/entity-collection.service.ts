import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { QueryParams, Update } from '../interfaces';
import { StoreService } from '../state/store.service';
import { DataService } from './data.service';


export abstract class EntityCollectionService<T> {

  constructor(public entityName: string,
              private readonly dataService: DataService<T>,
              private storeService: StoreService<T>) {
  }

  entityStore(): Observable<T[]> {
    return this.storeService.entityStore(this.entityName);
  }

  add(entity: T): Observable<T> {
    return this.dataService.add(this.entityName, entity)
      .pipe(
        tap(() => this.storeService.upsertEntity(this.entityName, entity))
      );
  }

  delete(key: number | string): Observable<number | string> {
    return this.dataService.delete(this.entityName, key)
      .pipe(
        tap(() => this.storeService.deleteEntity(this.entityName, key))
      );
  }

  getAll(): Observable<T[]> {
    return this.dataService.getAll(this.entityName).pipe(
      tap(list => this.storeService.emit(this.entityName, list))
    );
  }

  getById(key: number | string): Observable<T> {
    return this.dataService.getById(this.entityName, key);
  }

  getWithQuery(queryParams: QueryParams | string): Observable<T[]> {
    return this.dataService.getWithQuery(this.entityName, queryParams)
      .pipe(tap(list => this.storeService.emit(this.entityName, list))
      );
  }

  update(update: Update<T>): Observable<T> {
    return this.dataService.update(this.entityName, update)
      .pipe(
        tap(() => this.storeService.upsertEntity(this.entityName, update))
      );
  }

  upsert(entity: T): Observable<T> {
    return this.dataService.upsert(this.entityName, entity)
      .pipe(tap(() => this.storeService.upsertEntity(this.entityName, entity))
      );
  }
}
