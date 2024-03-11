import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluiComponent } from './exclui.component';

describe('ExcluiComponent', () => {
  let component: ExcluiComponent;
  let fixture: ComponentFixture<ExcluiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExcluiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcluiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
