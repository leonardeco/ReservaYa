import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Admin } from './admin';

describe('Admin', () => {
  let component: Admin;
  let fixture: ComponentFixture<Admin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Admin],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Admin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe iniciar en la sección "reservas"', () => {
    expect(component.seccionActiva()).toBe('reservas');
  });

  it('debe cambiar la sección activa correctamente', () => {
    component.setSeccion('mesas');
    expect(component.seccionActiva()).toBe('mesas');

    component.setSeccion('estadisticas');
    expect(component.seccionActiva()).toBe('estadisticas');
  });

  it('debe tener 6 reservas en la lista', () => {
    expect(component.reservas.length).toBe(6);
  });

  it('debe tener 7 días en la ocupación semanal', () => {
    expect(component.ocupacionSemanal.length).toBe(7);
  });

  it('getEstadoClass debe retornar clase verde para Confirmada', () => {
    expect(component.getEstadoClass('Confirmada')).toContain('green');
  });

  it('getEstadoClass debe retornar clase amarilla para Pendiente', () => {
    expect(component.getEstadoClass('Pendiente')).toContain('yellow');
  });

  it('getEstadoClass debe retornar clase roja para Cancelada', () => {
    expect(component.getEstadoClass('Cancelada')).toContain('red');
  });

  it('getBarHeight debe calcular altura en px correctamente', () => {
    expect(component.getBarHeight(100)).toBe('90px');
    expect(component.getBarHeight(50)).toBe('45px');
  });

  it('debe tener estadísticas del dashboard definidas', () => {
    expect(component.reservasHoy).toBeGreaterThan(0);
    expect(component.mesasDisponibles).toBeGreaterThan(0);
    expect(component.mesasTotales).toBeGreaterThan(0);
    expect(component.ocupacion).toBeGreaterThan(0);
    expect(component.nuevasReservas).toBeGreaterThan(0);
  });

  it('todas las reservas deben tener estado válido', () => {
    const estadosValidos = ['Confirmada', 'Pendiente', 'Cancelada'];
    component.reservas.forEach(r => {
      expect(estadosValidos).toContain(r.estado);
    });
  });

  it('todos los días deben tener porcentaje entre 0 y 100', () => {
    component.ocupacionSemanal.forEach(d => {
      expect(d.porcentaje).toBeGreaterThanOrEqual(0);
      expect(d.porcentaje).toBeLessThanOrEqual(100);
    });
  });
});
