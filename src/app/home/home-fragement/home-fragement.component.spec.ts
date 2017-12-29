import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFragementComponent } from './home-fragement.component';

describe('HomeFragementComponent', () => {
  let component: HomeFragementComponent;
  let fixture: ComponentFixture<HomeFragementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFragementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFragementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
