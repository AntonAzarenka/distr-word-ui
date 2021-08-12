import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMainComponent } from './team-main.component';

describe('TeamMainComponent', () => {
  let component: TeamMainComponent;
  let fixture: ComponentFixture<TeamMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
