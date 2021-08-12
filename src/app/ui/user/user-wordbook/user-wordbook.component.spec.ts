import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWordbookComponent } from './user-wordbook.component';

describe('UserWordbookComponent', () => {
  let component: UserWordbookComponent;
  let fixture: ComponentFixture<UserWordbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWordbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWordbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
