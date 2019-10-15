import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessContentPage } from './assess-content.page';

describe('AssessContentPage', () => {
  let component: AssessContentPage;
  let fixture: ComponentFixture<AssessContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessContentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
