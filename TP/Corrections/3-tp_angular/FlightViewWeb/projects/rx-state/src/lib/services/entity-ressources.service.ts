import { Inject, Injectable } from '@angular/core';
import { EntitiesConfig, ENTITIES_CONFIG } from '../entities-config.token';

@Injectable({
  providedIn: 'root'
})
export class EntityRessourcesService {

  constructor(@Inject(ENTITIES_CONFIG) private readonly entitiesConfig: EntitiesConfig){}
  getUrl(entityName: string): string {
    return `${this.entitiesConfig.apiEndpoint}/${this.entitiesConfig.entitiesRessources[entityName].url}/`;
  }

  getSelectId(entityName: string): (x) => number | string {
    return this.entitiesConfig.entitiesRessources[entityName].selectId;
  }
}
