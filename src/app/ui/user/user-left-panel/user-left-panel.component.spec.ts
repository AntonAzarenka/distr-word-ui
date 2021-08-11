import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLeftPanelComponent } from './user-left-panel.component';

describe('UserLeftPanelComponent', () => {
  let component: UserLeftPanelComponent;
  let fixture: ComponentFixture<UserLeftPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLeftPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
