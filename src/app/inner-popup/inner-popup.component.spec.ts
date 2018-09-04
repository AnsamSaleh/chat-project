import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerPopupComponent } from './inner-popup.component';

describe('InnerPopupComponent', () => {
  let component: InnerPopupComponent;
  let fixture: ComponentFixture<InnerPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
