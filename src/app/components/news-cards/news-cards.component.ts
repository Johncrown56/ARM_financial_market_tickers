import { Component, OnInit, Input } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-news-cards',
  templateUrl: './news-cards.component.html',
  styleUrls: ['./news-cards.component.css']
})
export class NewsCardsComponent implements OnInit {
  faAngleRight = faAngleRight

  @Input() uuid?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() keywords?: string;
  @Input() snippet?: string;
  @Input() url?: string;
  @Input() image_url?: string;
  @Input() published_at?: string;



  constructor() { }

  ngOnInit(): void {
  }

}
