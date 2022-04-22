import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  countries = '../../assets/json/countries.json';
  industries = '../../assets/json/industries.json';
  exchanges = '../../assets/json/exchanges.json';

  constructor(private httpService: HttpService, public http: HttpClient) { }

  // Get all the finance and market news
  public getAllNews(values: any): Observable<any> {
    return this.httpService.get('news/all'+ values);
  }

  // Get all the countries data
  public getAllCountries() {
    return this.http.get(this.countries);
  }
  // Get all the industries data
  public getAllIndustries() {
    return this.http.get(this.industries);
  }
// Get all the exchanges data
  public getAllExchanges() {
    return this.http.get(this.exchanges);
  }
}
