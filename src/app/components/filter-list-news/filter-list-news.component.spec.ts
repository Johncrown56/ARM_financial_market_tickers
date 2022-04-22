import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterListNewsComponent } from './filter-list-news.component';

describe('FilterListNewsComponent', () => {
  let component: FilterListNewsComponent;
  let fixture: ComponentFixture<FilterListNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterListNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterListNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
