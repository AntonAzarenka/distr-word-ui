import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantEditModalComponent } from './participant-edit-modal.component';

describe('ParticipantEditModalComponent', () => {
  let component: ParticipantEditModalComponent;
  let fixture: ComponentFixture<ParticipantEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
