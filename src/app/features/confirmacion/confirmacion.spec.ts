import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';

import { Confirmacion } from './confirmacion';

describe('Confirmacion', () => {
  let component: Confirmacion;
  let fixture: ComponentFixture<Confirmacion>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Confirmacion],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Confirmacion);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar La Terraza como restaurante confirmado', () => {
    expect(component.restaurante().name).toBe('La Terraza');
  });

  it('debe generar un código de reserva con formato RY-', () => {
    component.svc.generarCodigo();
    expect(component.svc.codigoReserva()).toMatch(/^RY-/);
  });

  it('debe tener personas mayor a 0 por defecto', () => {
    expect(component.svc.personas()).toBeGreaterThan(0);
  });

  it('debe navegar a /inicio al volver al inicio', () => {
    const spy = vi.spyOn(router, 'navigate');
    component.volverAlInicio();
    expect(spy).toHaveBeenCalledWith(['/inicio']);
  });

  it('debe tener teléfono del restaurante definido', () => {
    expect(component.restaurante().phone).toBeTruthy();
  });
});
