import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Restaurantes } from './restaurantes';

describe('Restaurantes', () => {
  let component: Restaurantes;
  let fixture: ComponentFixture<Restaurantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Restaurantes],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Restaurantes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
