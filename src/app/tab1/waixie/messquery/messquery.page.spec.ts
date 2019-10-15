import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessqueryPage } from './messquery.page';

describe('MessqueryPage', () => {
  let component: MessqueryPage;
  let fixture: ComponentFixture<MessqueryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessqueryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessqueryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
