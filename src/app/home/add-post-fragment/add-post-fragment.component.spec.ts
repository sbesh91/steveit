import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostFragmentComponent } from './add-post-fragment.component';

describe('AddPostFragmentComponent', () => {
  let component: AddPostFragmentComponent;
  let fixture: ComponentFixture<AddPostFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
