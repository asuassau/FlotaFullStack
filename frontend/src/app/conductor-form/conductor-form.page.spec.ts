import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConductorFormPage } from './conductor-form.page';

describe('ConductorFormPage', () => {
  let component: ConductorFormPage;
  let fixture: ComponentFixture<ConductorFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductorFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
