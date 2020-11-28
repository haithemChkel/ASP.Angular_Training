import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dictionary } from '../interfaces/dictionary';
import { Update } from '../interfaces/update';
import { EntityRessourcesService } from '../services/entity-ressources.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService<T> {

  initialState = {};
  private readonly store = new BehaviorSubject<Dictionary<T[]>>(this.initialState);

  constructor(private readonly entityRessources: EntityRessourcesService) { }

  entityStore(entityName: string): Observable<T[]> {
    return this.store.asObservable().pipe(map(store => {
      const entityState = store[entityName];
      return entityState === undefined || entityState === null ? [] : Object.values(entityState);
    }));
  }

  emit(entityName: string, values: T[]): void {
    const storeState = this.store.value;
    const selectfn = this.entityRessources.getSelectId(entityName);
    const entityNewState = {};
    for (const v of values) {
      entityNewState[selectfn(v)] = v;
    }
    storeState[entityName] = entityNewState;
    this.store.next({ ...storeState });
  }

  getById(entityName: string, key: number | string): Observable<T> {
    return this.entityStore(entityName).pipe(map(eStore => eStore[key]));
  }

  upsertEntity(entityName: string, entity: T | Update<T>): void {
    const selectfn = this.entityRessources.getSelectId(entityName);
    const storeState = this.store.value;
    const entityStoreState = storeState[entityName] ?? {};
    let entityToUpdate: T | Partial<T>;
    if (entity.hasOwnProperty('changes')){
      entityToUpdate = (entity as  Update<T>).changes;
    }
    const actualEntity = entityStoreState[selectfn(entityToUpdate)];
    const newEntityStoreState = { ...entityStoreState };
    newEntityStoreState[selectfn(entityToUpdate)] = { ...actualEntity, ...entityToUpdate };
    storeState[entityName] = newEntityStoreState;
    this.store.next({ ...storeState });
  }

  deleteEntity(entityName: string, idToDelete: number | string): void {
    const storeState = this.store.value;
    const entityStoreState = storeState[entityName];
    if (!entityStoreState) {
      return;
    }
    const selectfn = this.entityRessources.getSelectId(entityName);
    const newEntityStoreState = {};
    for (const v of Object.values(entityStoreState)) {
      if (idToDelete !== selectfn(v)) {
        newEntityStoreState[selectfn(v)] = v;
      }
    }
    storeState[entityName] = newEntityStoreState;
    this.store.next({ ...storeState });
  }
}
