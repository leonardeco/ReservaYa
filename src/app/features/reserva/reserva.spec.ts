import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';

import { Reserva } from './reserva';

describe('Reserva', () => {
  let component: Reserva;
  let fixture: ComponentFixture<Reserva>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reserva],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Reserva);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar La Terraza como restaurante por defecto', () => {
    expect(component.restaurante().name).toBe('La Terraza');
  });

  it('debe inicializar el formulario vacío', () => {
    expect(component.nombre).toBe('');
    expect(component.telefono).toBe('');
    expect(component.correo).toBe('');
    expect(component.notas).toBe('');
    expect(component.aceptaTerminos).toBeFalsy();
  });

  it('NO debe navegar si los términos no están aceptados', () => {
    const spy = vi.spyOn(router, 'navigate');
    component.aceptaTerminos = false;
    component.confirmarReserva();
    expect(spy).not.toHaveBeenCalled();
  });

  it('debe navegar a /confirmacion al aceptar términos y confirmar', () => {
    const spy = vi.spyOn(router, 'navigate');
    component.aceptaTerminos = true;
    component.nombre = 'Leonardo';
    component.telefono = '3001234567';
    component.correo = 'leo@test.com';
    component.confirmarReserva();
    expect(spy).toHaveBeenCalledWith(['/confirmacion']);
  });

  it('debe navegar a /detalle al volver al restaurante', () => {
    const spy = vi.spyOn(router, 'navigate');
    component.backToDetalle();
    expect(spy).toHaveBeenCalled();
  });

  it('debe tener hora y personas definidos en el servicio', () => {
    expect(component.svc.hora()).toBeTruthy();
    expect(component.svc.personas()).toBeGreaterThan(0);
  });
});
