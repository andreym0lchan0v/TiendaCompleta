import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductClienteComponent } from './product-cliente.component';

describe('ProductClienteComponent', () => {
  let component: ProductClienteComponent;
  let fixture: ComponentFixture<ProductClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
