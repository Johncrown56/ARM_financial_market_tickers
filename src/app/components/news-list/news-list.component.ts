import { Component, Input, OnInit } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  faAngleRight = faAngleRight;
  
  @Input() uuid?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() keywords?: string;
  @Input() snippet?: string;
  @Input() url?: string;
  @Input() image_url?: string;
  @Input() published_at?: string;
  @Input() industry?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
