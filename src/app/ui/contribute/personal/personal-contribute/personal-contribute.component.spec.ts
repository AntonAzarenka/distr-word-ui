import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalContributeComponent } from './personal-contribute.component';

describe('PersonalContributeComponent', () => {
  let component: PersonalContributeComponent;
  let fixture: ComponentFixture<PersonalContributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalContributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalContributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
