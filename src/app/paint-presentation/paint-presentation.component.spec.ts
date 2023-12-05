import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintPresentationComponent } from './paint-presentation.component';

describe('PaintPresentationComponent', () => {
  let component: PaintPresentationComponent;
  let fixture: ComponentFixture<PaintPresentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaintPresentationComponent]
    });
    fixture = TestBed.createComponent(PaintPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
