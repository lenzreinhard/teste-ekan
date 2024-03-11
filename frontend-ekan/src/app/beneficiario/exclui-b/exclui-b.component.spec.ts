import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluiBComponent } from './exclui-b.component';

describe('ExcluiBComponent', () => {
  let component: ExcluiBComponent;
  let fixture: ComponentFixture<ExcluiBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExcluiBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcluiBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
