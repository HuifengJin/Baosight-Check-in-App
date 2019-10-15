import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaixieLoginPage } from './waixie-login.page';

describe('WaixieLoginPage', () => {
  let component: WaixieLoginPage;
  let fixture: ComponentFixture<WaixieLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaixieLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaixieLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
