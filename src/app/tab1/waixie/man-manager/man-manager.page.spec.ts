import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManManagerPage } from './man-manager.page';

describe('ManManagerPage', () => {
  let component: ManManagerPage;
  let fixture: ComponentFixture<ManManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManManagerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
