import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyVehiculosPage } from './my-vehiculos.page';

describe('MyVehiculosPage', () => {
  let component: MyVehiculosPage;
  let fixture: ComponentFixture<MyVehiculosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVehiculosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
