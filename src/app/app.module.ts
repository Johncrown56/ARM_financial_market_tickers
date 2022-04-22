import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { NewsCardsComponent } from './components/news-cards/news-cards.component';
import { FilterNewsComponent } from './components/filter-news/filter-news.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterListNewsComponent } from './components/filter-list-news/filter-list-news.component';
import { NewsListComponent } from './components/news-list/news-list.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'filter-news', component: FilterNewsComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    NewsCardsComponent,
    FilterNewsComponent,
    FilterListNewsComponent,
    NewsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, RouterModule.forRoot(appRoutes, {enableTracing: false}), FontAwesomeModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
