import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Brand} from "../domain/brand";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private resourceUrl: string = environment.backendUrl + "brand";

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.resourceUrl)
      .pipe(map(brands =>
        brands.map(b => new Brand(b.id,
          b.name, b.models)
        )));
  }

}
