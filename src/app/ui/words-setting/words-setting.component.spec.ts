import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsSettingComponent } from './words-setting.component';

describe('WordsSettingComponent', () => {
  let component: WordsSettingComponent;
  let fixture: ComponentFixture<WordsSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
