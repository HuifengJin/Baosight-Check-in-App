import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquirePage } from './inquire.page';

describe('InquirePage', () => {
  let component: InquirePage;
  let fixture: ComponentFixture<InquirePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquirePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
