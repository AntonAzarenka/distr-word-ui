import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordEditModalComponent } from './word-edit-modal.component';

describe('WordEditModalComponent', () => {
  let component: WordEditModalComponent;
  let fixture: ComponentFixture<WordEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
