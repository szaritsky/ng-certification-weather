import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherAddLocationComponent } from './weather-add-location.component';

describe('WeatherAddLocationComponent', () => {
  let component: WeatherAddLocationComponent;
  let fixture: ComponentFixture<WeatherAddLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherAddLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherAddLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
