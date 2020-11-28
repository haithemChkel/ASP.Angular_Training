import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, timeout } from 'rxjs/operators';
import { HttpMethods, QueryParams, RequestData, Update } from '../interfaces';
import { EntityRessourcesService } from './entity-ressources.service';

export class DataServiceError {
  message: string | null;

  constructor(public error: any, public requestData: RequestData | null) {
    this.message = typeof error === 'string' ? error : extractMessage(error);
  }
}

// Many ways the error can be shaped. These are the ways we recognize.
function extractMessage(sourceError: any): string | null {
  const { error, body, message } = sourceError;
  let errMessage: string | null = null;
  if (error) {
    // prefer HttpErrorResponse.error to its message property
    errMessage = typeof error === 'string' ? error : error.message;
  } else if (message) {
    errMessage = message;
  } else if (body) {
    // try the body if no error or message property
    errMessage = typeof body === 'string' ? body : body.error;
  }

  return typeof errMessage === 'string'
    ? errMessage
    : errMessage
    ? JSON.stringify(errMessage)
    : null;
}

@Injectable({
  providedIn: 'root'
})
export class DataService<T> {

  protected delete404OK: boolean;
  protected entityName: string;
  protected entitiesUrl: string;
  protected getDelay = 0;
  protected saveDelay = 0;
  protected timeout = 0;

  constructor(private readonly http: HttpClient, private readonly entityRessources: EntityRessourcesService) { }

  add(entityName: string, entity: T): Observable<T> {
    const entityOrError =
      entity || new Error(`No "${entityName}" entity to add`);
    return this.execute('POST', this.entityUrl(entityName), entityOrError);
  }

  delete(entityName: string, key: number | string): Observable<number | string> {
    let err: Error | undefined;
    if (key == null) {
      err = new Error(`No "${entityName}" key to delete`);
    }
    return this.execute('DELETE', this.entityUrl(entityName) + key, err).pipe(
      // forward the id of deleted entity as the result of the HTTP DELETE
      map((result) => key as number | string)
    );
  }

  getAll(entityName: string): Observable<T[]> {
    return this.execute('GET', this.entityUrl(entityName));
  }

  getById(entityName: string, key: number | string): Observable<T> {
    let err: Error | undefined;
    if (key == null) {
      err = new Error(`No "${entityName}" key to get`);
    }
    return this.execute('GET', this.entityUrl(entityName) + key, err);
  }

  getWithQuery(entityName: string, queryParams: QueryParams | string): Observable<T[]> {
    const qParams =
      typeof queryParams === 'string'
        ? { fromString: queryParams }
        : { fromObject: queryParams };
    const params = new HttpParams(qParams);
    return this.execute('GET', this.entityUrl(entityName), undefined, { params });
  }

  update(entityName: string, update: Update<T>): Observable<T> {
    const id = update && update.id;
    const updateOrError =
      id == null
        ? new Error(`No "${entityName}" update data or id`)
        : update.changes;
    return this.execute('PUT', this.entityUrl(entityName) + id, updateOrError);
  }

  // Important! Only call if the backend service supports upserts as a POST to the target URL
  upsert(entityName: string, entity: T): Observable<T> {
    const entityOrError =
      entity || new Error(`No "${entityName}" entity to upsert`);
    return this.execute('POST', this.entityUrl(entityName), entityOrError);
  }

  protected execute(
    method: HttpMethods,
    url: string,
    data?: any, // data, error, or undefined/null
    options?: any
  ): Observable<any> {
    const req: RequestData = { method, url, data, options };

    if (data instanceof Error) {
      return this.handleError(req)(data);
    }

    let result$: Observable<ArrayBuffer>;

    switch (method) {
      case 'DELETE': {
        result$ = this.http.delete(url, options);
        if (this.saveDelay) {
          result$ = result$.pipe(delay(this.saveDelay));
        }
        break;
      }
      case 'GET': {
        result$ = this.http.get(url, options);
        if (this.getDelay) {
          result$ = result$.pipe(delay(this.getDelay));
        }
        break;
      }
      case 'POST': {
        result$ = this.http.post(url, data, options);
        if (this.saveDelay) {
          result$ = result$.pipe(delay(this.saveDelay));
        }
        break;
      }
      // N.B.: It must return an Update<T>
      case 'PUT': {
        result$ = this.http.put(url, data, options);
        if (this.saveDelay) {
          result$ = result$.pipe(delay(this.saveDelay));
        }
        break;
      }
      default: {
        const error = new Error('Unimplemented HTTP method, ' + method);
        result$ = throwError(error);
      }
    }
    if (this.timeout) {
      result$ = result$.pipe(timeout(this.timeout + this.saveDelay));
    }
    return result$.pipe(catchError(this.handleError(req)));
  }

  private handleError(reqData: RequestData): any {
    return (err: any) => {
      const ok = this.handleDelete404(err, reqData);
      if (ok) {
        return ok;
      }
      const error = new DataServiceError(err, reqData);
      return throwError(error);
    };
  }

  private handleDelete404(error: HttpErrorResponse, reqData: RequestData): any {
    if (
      error.status === 404 &&
      reqData.method === 'DELETE' &&
      this.delete404OK
    ) {
      return of({});
    }
    return undefined;
  }

  private entityUrl(entityName: string): string {
    return this.entityRessources.getUrl(entityName);
  }
}
