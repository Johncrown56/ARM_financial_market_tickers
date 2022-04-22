import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  news: any;
  news2: any;
  news3: any;
  [key:string]:any;

  constructor(private apiService: ApiService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getAll3News();
    //this.getThingsWithParams();
  }

  getAllNews(){
    const option = {
      symbols: "TSLA%2CAMZN%2CMSFT",
      filter_entities: true,
      language: "en",
      api_token: environment.marketaux.apiToken
      }
      const options = "?filter_entities=true&language=en&api_token="+environment.marketaux.apiToken;
      console.log(options);
      
      this.apiService.getAllNews(options).subscribe((res: any)=>{ 
        console.log(res);
        this.news = res?.data;
      })
  }


  getAll3News() {
    //Since we can only get 3 results per API call, Let's use forkJoin function to consume multiple APIs at the same time.
    const array = [
      {id: 1},
      {id: 2}, 
      {id: 3}
    ];

  //   for(let i=0; i<array.length; i++){
  //     let getPage = array[i].id;
  //     console.log(getPage);
  //     this['options' + array[i].id] = "?filter_entities=true&language=en&page="+getPage+"&api_token="+environment.marketaux.apiToken;
  // }

    const getPage1=1;
    const options1 = "?filter_entities=true&language=en&page="+getPage1+"&api_token="+environment.marketaux.apiToken;
    const getPage2=2;
    const options2 = "?filter_entities=true&language=en&page="+getPage2+"&api_token="+environment.marketaux.apiToken;
    const getPage3=3;
    const options3 = "?filter_entities=true&language=en&page="+getPage3+"&api_token="+environment.marketaux.apiToken;
    forkJoin([
      this.apiService.getAllNews(options1), //observable 1
      this.apiService.getAllNews(options2), //observable 2
      this.apiService.getAllNews(options3) //observable 3
    ]).subscribe((result: any) => {
      console.log(result[0]);
      console.log(result[1]);
      console.log(result[2]);
      this.news = result[0]?.data;
      this.news2 = result[1]?.data;
      this.news3 = result[2]?.data;
    })
  }

  getThingsWithParams(): any { // you could pass your object in as a function parameter
    //const myObject: any = { this: 'thisThing', that: 'thatThing', other: 'otherThing'};
    const option= {
      symbols: "TSLA%2CAMZN%2CMSFT",
      filter_entities: true,
      language: "en",
      api_token: environment.marketaux.apiToken
      }

      const params = new HttpParams({
        fromObject: {
          param1: 'value1',
          param2: 'value2',
        }
      });
      console.log(params)
    const httpParams: HttpParamsOptions = { fromObject: option } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams) };
    return this.httpClient.get<any>('https://api.marketaux.com/v1/news/all', options).subscribe((data: any)=>{ 
      console.log(data);
    });
    // This is what is sent to the API:
    // http://localhost:34479/api/products/168?this=thisThing&that=thatThing&other=otherThing
}

}
