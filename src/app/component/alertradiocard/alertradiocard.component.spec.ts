import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertradiocardPage } from './alertradiocard.page';

describe('AlertradiocardPage', () => {
  let component: AlertradiocardPage;
  let fixture: ComponentFixture<AlertradiocardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertradiocardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertradiocardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
