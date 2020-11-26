import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface EntityRessource
{
  url: string;
  selectId?: (x) => number | string;
  sort?: (x) => number;
}

export abstract class EntityHttpResourceUrls {
  [entityName: string]: EntityRessource;
}

@Injectable({
  providedIn: 'root'
})
export class EntityRessourcesService {

  entityHttpResourceUrls: EntityHttpResourceUrls = environment.entityHttpResourceUrls;

  getUrl(entityName: string): string {
    return `${environment.apiUrl}/${this.entityHttpResourceUrls[entityName].url}/`;
  }

  getSelectId(entityName: string): (x) => number | string {
    return this.entityHttpResourceUrls[entityName].selectId;
  }
}
