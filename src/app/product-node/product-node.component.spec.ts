import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNodeComponent } from './product-node.component';

describe('ProductNodeComponent', () => {
  let component: ProductNodeComponent;
  let fixture: ComponentFixture<ProductNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
