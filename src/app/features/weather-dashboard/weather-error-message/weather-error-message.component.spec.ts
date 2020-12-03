import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherErrorMessageComponent } from './weather-error-message.component';

describe('WeatherErrorMessageComponent', () => {
  let component: WeatherErrorMessageComponent;
  let fixture: ComponentFixture<WeatherErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherErrorMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
