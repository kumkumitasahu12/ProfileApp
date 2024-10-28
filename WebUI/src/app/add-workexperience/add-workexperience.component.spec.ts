import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkexperienceComponent } from './add-workexperience.component';

describe('AddWorkexperienceComponent', () => {
  let component: AddWorkexperienceComponent;
  let fixture: ComponentFixture<AddWorkexperienceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWorkexperienceComponent]
    });
    fixture = TestBed.createComponent(AddWorkexperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
