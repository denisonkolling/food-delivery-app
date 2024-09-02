import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { LayoutComponent } from '../layout/layout.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { RestaurantService } from '../../services/restaurant.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-order-create-v2',
  standalone: true,
  imports: [ButtonModule, InputTextModule, TableModule, LayoutComponent, CommonModule, ReactiveFormsModule],
  providers: [CustomerService, RestaurantService, ProductService],
  templateUrl: './order-create-table.component.html',
  styleUrl: './order-create-table.component.css'
})
export class OrderCreateV2Component {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private restaurantService: RestaurantService,
    private productService: ProductService,
  ) {
    this.form = this.fb.group({
      customer: [null, Validators.required],
      restaurant: [null, Validators.required],
      items: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      customer: [''],
      customerName: [{ value: '', disabled: true }],
      restaurant: [''],
      restaurantName: [{ value: '', disabled: true }],
      product: [''],
      productName: [{ value: '', disabled: true }],
      productQuantity: [''],
      productPrice: [{ value: '', disabled: true }],
      items: this.fb.array([]),
    });

    this.onChanges();
  }

  onChanges(): void {
    this.form.get('customer')!.valueChanges.subscribe((customerId) => {
      if (customerId) {
        this.customerService.getCustomerById(customerId).subscribe((data) => {
          this.form.patchValue({ customerName: data.name });
        });
      }
    });

    this.form.get('restaurant')!.valueChanges.subscribe((restaurantId) => {
      if (restaurantId) {
        this.restaurantService.getRestaurantById(restaurantId).subscribe((data) => {
          this.form.patchValue({ restaurantName: data.name });
        });
      }
    });

    this.form.get('product')!.valueChanges.subscribe((productId) => {
      if (productId) {
        this.productService.getProductById(productId).subscribe((data) => {
          this.form.patchValue({
            productName: data.name,
            productPrice: data.price
          });
        });
      }
    });
  }

  get customer() {
    return this.form.controls['customer'];
  }

  get restaurant() {
    return this.form.controls['restaurant'];
  }

  get product() {
    return this.form.controls['product']
  }

  get itemsArray(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(): void {

    const product = this.form.get('product')!.value;
    const productName = this.form.get('productName')!.value;
    const productQuantity = this.form.get('productQuantity')!.value;
    const productPrice = this.form.get('productPrice')!.value;

    const newItem = this.fb.group({
      id: [this.itemsArray.length + 1],
      product: this.fb.group({
        id: [product],
        name: [productName],
      }),
      quantity: [productQuantity, [Validators.required, Validators.min(1)]],
      price: [productPrice, Validators.required],
    });

    this.itemsArray.push(newItem);

    this.form.patchValue({
      product: '',
      productName: '',
      productQuantity: '',
      productPrice: '',
    });
  }

  get total(): number {
    return this.itemsArray.controls.reduce((total, item) => {
      const price = item.get('price')?.value || 0;
      const quantity = item.get('quantity')?.value || 0;
      return total + (price * quantity);
    }, 0);
  }

  removeProduct(index: number) {
    this.itemsArray.removeAt(index);
  }

  onSubmit() {
    console.log(this.form);
  }

}
