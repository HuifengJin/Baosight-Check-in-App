import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefendPage } from './defend.page';

describe('DefendPage', () => {
  let component: DefendPage;
  let fixture: ComponentFixture<DefendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefendPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
