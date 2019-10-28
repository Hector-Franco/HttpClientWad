import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Employee } from '../interfaces/employess.interface';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  endPoint = 'http://dummy.restapiexample.com/api/v1/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    console.log('Servicio Listo');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getProducts(): Observable<any> {
    return this.http
      .get(this.endPoint + 'employees')
      .pipe(map(this.extractData));
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(this.endPoint + 'employee/' + id)
      .pipe(
        map(this.extractData)
      );
  }

  addProduct(product: Employee): Observable<any> {
    console.log(product);
    return this.http.post<any>(
      this.endPoint + 'create',
      JSON.stringify(product),
      this.httpOptions
    )
      .pipe(
        tap(
          (productRes) => console.log(`added product w/ id=${productRes.id}`)
        ),
        catchError(
          this.handleError<any>('addProduct')
        )
      );
  }

  updateProduct(id: string, product: Employee): Observable<any> {
    return this.http.put
    (
      `${this.endPoint}update/${id}`,
      JSON.stringify(product),
      this.httpOptions
    )
      .pipe(
        tap(
          _ => console.log(`updated product id=${id}`)
        ),
        catchError(
          this.handleError<any>('updateProduct')
        )
      );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.endPoint}delete/${id}`,
      this.httpOptions
    )
      .pipe(
        tap(_ => console.log(`deleted product id=${id}`)),
        catchError(this.handleError<any>('deleteProduct'))
      );
  }


  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);

    };
  }
}
