import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartoCardComponent } from './quarto-card.component';

describe('QuartoCardComponent', () => {
  let component: QuartoCardComponent;
  let fixture: ComponentFixture<QuartoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuartoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuartoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
