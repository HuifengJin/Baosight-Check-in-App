import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffirmDetailPage } from './affirm-detail.page';

describe('AffirmDetailPage', () => {
  let component: AffirmDetailPage;
  let fixture: ComponentFixture<AffirmDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffirmDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffirmDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
