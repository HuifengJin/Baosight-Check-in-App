import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquireDetailPage } from './inquire-detail.page';

describe('InquireDetailPage', () => {
  let component: InquireDetailPage;
  let fixture: ComponentFixture<InquireDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquireDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquireDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
