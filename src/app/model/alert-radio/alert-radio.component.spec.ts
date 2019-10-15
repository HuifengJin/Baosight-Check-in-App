import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertRadioPage } from './alert-radio.page';

describe('AlertRadioPage', () => {
  let component: AlertRadioPage;
  let fixture: ComponentFixture<AlertRadioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertRadioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertRadioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
