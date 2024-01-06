import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationNameSpaceComponent } from './translation-name-space.component';

describe('TranslationNameSpaceComponent', () => {
  let component: TranslationNameSpaceComponent;
  let fixture: ComponentFixture<TranslationNameSpaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationNameSpaceComponent]
    });
    fixture = TestBed.createComponent(TranslationNameSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
