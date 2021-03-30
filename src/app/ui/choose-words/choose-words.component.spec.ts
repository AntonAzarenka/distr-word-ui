import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseWordsComponent } from './choose-words.component';

describe('ChooseWordsComponent', () => {
  let component: ChooseWordsComponent;
  let fixture: ComponentFixture<ChooseWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
