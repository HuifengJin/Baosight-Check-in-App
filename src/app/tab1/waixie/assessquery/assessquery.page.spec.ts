import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessqueryPage } from './assessquery.page';

describe('AssessqueryPage', () => {
  let component: AssessqueryPage;
  let fixture: ComponentFixture<AssessqueryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessqueryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessqueryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
