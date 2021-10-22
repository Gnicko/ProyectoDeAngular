import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Model} from "../domain/model";
import {Brand} from "../domain/brand";

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private resourceUrl: string = environment.backendUrl + "model";

  constructor(private http: HttpClient) {
  }

  public findOne(id: number): Observable<Model[]> {
    return this.http.get<Model[]>(this.resourceUrl + "/" + id)
      .pipe(
        catchError(error => {
          console.log("Error al cargar el modelo")
          return throwError("No se encontró el Modelo.");
        }),
        map(models =>
          models.map(m => new Model(m.id, m.name,
            //uso un operador ternario porque como el valor que devuelve es un null,
            // hace que falle al momento de cargar los dato del select html
            ((m.brand !== null) ? new Brand(m.brand.id, m.brand.name, m.brand.models) :
              new Brand(0, "", [""]))
          ))
        ));
  }

}
