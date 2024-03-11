import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoBComponent } from './novo-b.component';

describe('NovoBComponent', () => {
  let component: NovoBComponent;
  let fixture: ComponentFixture<NovoBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NovoBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovoBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
