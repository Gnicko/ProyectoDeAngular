import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Bus} from "../domain/bus";
import {Model} from "../domain/model";
import {Brand} from "../domain/brand";

@Injectable({
  providedIn: 'root'
})
export class BusesService {

  private resourceUrl: string = environment.backendUrl + "buses";

  constructor(private http: HttpClient) {
  }

  public findOne(id: number): Observable<Bus | null> {
    return this.http.get<Bus>(this.resourceUrl + "/" + id)
      .pipe(
        catchError(error => {
          console.log("Error")
          return throwError("El id no existe.");
        }),

        map(b => new Bus(b.id,
          b.licensePlate, new Model(b.model.id, b.model.name,
            new Brand(b.model.brand.id, b.model.brand.name, b.model.brand.models)),
          b.numberOfSeats)
        ));
  }

  public findAll(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.resourceUrl)
      .pipe(map(buses =>
        buses.map(b => new Bus(b.id,
          b.licensePlate, new Model(b.model.id, b.model.name,
            new Brand(b.model.brand.id, b.model.brand.name, b.model.brand.models)),
          b.numberOfSeats)
        )));
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.resourceUrl + "/" + id)
      .pipe(
        catchError(error => {
          return throwError("El colectivo contiene informacion asociada.");
        }));
  }

  create(bus: Bus): Observable<any> {
    return this.http.post<any>(this.resourceUrl, bus).pipe(
      catchError(error => {
        console.log("Error")
        return throwError("El bus no pudo ser creada.");
      }));
  }

  update(bus: Bus): Observable<any> {
    return this.http.put<any>(this.resourceUrl, bus).pipe(
      catchError(error => {
        console.log("Error")
        return throwError("El bus no pudo ser actualizada.");
      }))
  }


}
