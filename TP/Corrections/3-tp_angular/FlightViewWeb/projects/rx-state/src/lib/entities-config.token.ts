// ********************************************************
// ************ DO NOT USE IN PRODUCTION ******************
// ********************************************************
import { InjectionToken } from '@angular/core';

export interface EntityRessource
{
  url: string;
  selectId?: (x) => number | string;
  sort?: (x) => number;
}

export abstract class EntitiesRessources {
  [entityName: string]: EntityRessource;
}

export abstract class EntitiesConfig {
  apiEndpoint?: string;
  entitiesRessources: EntitiesRessources;
}

export const ENTITIES_CONFIG = new InjectionToken<EntitiesConfig>('entities.config');
