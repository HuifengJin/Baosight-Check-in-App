import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessqueryContentPage } from './assessquery-content.page';

describe('AssessqueryContentPage', () => {
  let component: AssessqueryContentPage;
  let fixture: ComponentFixture<AssessqueryContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessqueryContentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessqueryContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
