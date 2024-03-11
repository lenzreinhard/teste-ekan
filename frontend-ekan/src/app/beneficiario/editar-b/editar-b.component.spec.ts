import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBComponent } from './editar-b.component';

describe('EditarBComponent', () => {
  let component: EditarBComponent;
  let fixture: ComponentFixture<EditarBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
