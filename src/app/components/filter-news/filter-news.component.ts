 import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { faCoffee, faTh, faThList } from '@fortawesome/free-solid-svg-icons';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filter-news',
  templateUrl: './filter-news.component.html',
  styleUrls: ['./filter-news.component.css']
})
export class FilterNewsComponent implements OnInit {
  form: FormGroup;
  news: any;
  news2: any;
  news3: any;
  faCoffee = faCoffee;
  faThList = faThList;
  faTh = faTh;
  isGridOpen: boolean = true; 
  isListOpen: boolean = false;
  countries: any;
  data:any;
  selectedCountries:any;
  industries:any
  exchanges:any;

  today?: any;
  yesterday: any;
  lastWeek?: any;
  lastMonth?: any; 
  lastThreeMonths?: any;
  lastSixMonths?: any;
  

  constructor(private apiService: ApiService, fb: FormBuilder, public datePipe: DatePipe) { 
    this.form = fb.group({
      selectedCountries:  new FormArray([]),
      selectedIndustries: new FormArray([]),
      selectedExchanges: new FormArray([]),
      duration: new FormControl('')
     });
  }

  ngOnInit(): void {
    this.getAll3News();
    this.getAllCountries();
    this.getAllIndustries();
    this.getAllExchanges();
    this.getAllDates();
  }

  getAllDates(){
    let date = new Date();
 this.today = this.datePipe.transform(date, 'yyyy-MM-dd');
 this.yesterday = this.datePipe.transform(date.setDate(date.getDate() - 1), 'yyyy-MM-dd');
 this.lastWeek = this.datePipe.transform(date.setDate(date.getDate() - 7), 'yyyy-MM-dd');
 this.lastMonth = this.datePipe.transform(date.setDate(date.getDate() - 30), 'yyyy-MM-dd');
 this.lastThreeMonths = this.datePipe.transform(date.setDate(date.getDate() - 90), 'yyyy-MM-dd');
 this.lastSixMonths = this.datePipe.transform(date.setDate(date.getDate() - 180), 'yyyy-MM-dd');
 console.log(this.today, this.yesterday, this.lastWeek, this.lastMonth, this.lastThreeMonths, this.lastSixMonths);
  }

  getAll3News() {
    //Since we can only get 3 results per API call, and we want to display up to 9 news, so let's use forkJoin function to consume multiple APIs at the same time.
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

  openGrid(){
    this.isGridOpen = true;
    this.isListOpen = false;
  }

  closeGrid(){
    this.isListOpen = true;
    this.isGridOpen = false;
  }

  getAllCountries(){
    this.apiService.getAllCountries().subscribe((res: any) => {
      console.log(res);
      this.countries = res.countries;
      // this.selectedCountries.map(() => {
      //   (this.form.controls["selectedCountries"] as FormArray).push(new FormControl());
      // });
    })
  }

  getAllIndustries(){
    this.apiService.getAllIndustries().subscribe((res: any) => {
      console.log(res);
      this.industries = res.industries;
    });
  }

  getAllExchanges(){
    this.apiService.getAllExchanges().subscribe((res: any) => {
      console.log(res);
      this.exchanges = res.exchanges;
    });
  }

  onCountryChange(event: any) {
    const selectedCountry = (this.form.controls["selectedCountries"] as FormArray);
    if (event.target.checked) {
      selectedCountry.push(new FormControl(event.target.value));
    } else {
      const index = selectedCountry.controls
      .findIndex(x => x.value === event.target.value);
      selectedCountry.removeAt(index);
    }
  }

  onIndustryChange(event: any) {
    const selectedIndustry = (this.form.controls["selectedIndustries"] as FormArray);
    if (event.target.checked) {
      selectedIndustry.push(new FormControl(event.target.value));
    } else {
      const index = selectedIndustry.controls.findIndex(x => x.value === event.target.value);
      selectedIndustry.removeAt(index);
    }
  }

  onExchangeChange(event: any) {
    const selectedExchange = (this.form.controls["selectedExchanges"] as FormArray);
    if (event.target.checked) {
      selectedExchange.push(new FormControl(event.target.value));
    } else {
      const index = selectedExchange.controls
      .findIndex(x => x.value === event.target.value);
      selectedExchange.removeAt(index);
    }
  }

  onsubmit(){
    console.log(this.form.value);
    const allCountries = this.form.value.selectedCountries.map((x:any) => x).join(",");
    const allIndutries = this.form.value.selectedIndustries.map((x:any) => x).join(",");
    const allExchanges = this.form.value.selectedExchanges.map((x:any) => x).join(",");
    const duration = this.form.value.duration;
    console.log(allCountries, allIndutries, allExchanges, duration);
    this.searchNews(allCountries, allIndutries, allExchanges, duration);
  }

  searchNews(allCountries: string, allIndutries: string, allExchanges:string, duration:any){
    const getPage1=1;
    const options1 = "?countries="+allCountries+"&industries="+allIndutries+"&published_after="+duration+"&exchanges="+allExchanges+"&filter_entities=true&language=en&page="+getPage1+"&api_token="+environment.marketaux.apiToken;
    const getPage2=2;
    const options2 = "?countries="+allCountries+"&industries="+allIndutries+"&published_after="+duration+"&exchanges="+allExchanges+"&filter_entities=true&language=en&page="+getPage2+"&api_token="+environment.marketaux.apiToken;
    const getPage3=3;
    const options3 = "?countries="+allCountries+"&industries="+allIndutries+"&published_after="+duration+"&exchanges="+allExchanges+"&filter_entities=true&language=en&page="+getPage3+"&api_token="+environment.marketaux.apiToken;
    console.log(options1);
    console.log(options2);
    console.log(options3);
    forkJoin([
      this.apiService.getAllNews(options1), this.apiService.getAllNews(options2), this.apiService.getAllNews(options3)])
      .subscribe((result: any) => {
      console.log(result[0]);
      console.log(result[1]);
      console.log(result[2]);
      this.news = result[0]?.data;
      this.news2 = result[1]?.data;
      this.news3 = result[2]?.data;
    })
  }


}
