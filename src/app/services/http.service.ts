import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from './loading.service';
//import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  loadingElement: any;
  isLoading = false;
  dismiss: any;

  constructor(private http: HttpClient,
    //private loadingService: LoadingService
    ) { }

  post(endPoint: string, data: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredentials: false };
    const url = environment.marketaux.baseUrl + endPoint;

    //this.dismiss = this.loadingService.isLoading == false ? this.dismissLoader() : true;
    return this.http.post(url, JSON.stringify(data), options).pipe(
      finalize(() => {
      //this.dismissLoader;
    })
    );
  }

  get(endPoint: string) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredentials: false };
    const url = environment.marketaux.baseUrl + endPoint;
    return this.http.get(url, options).pipe(finalize(() => {
      //this.dismissLoader();
    }))
  }
}
