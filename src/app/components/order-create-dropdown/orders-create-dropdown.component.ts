import { OrderService } from '../../services/order.service';
import { CardModule } from 'primeng/card';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { RestaurantService } from '../../services/restaurant.service';
import { ProductService } from '../../services/product.service';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { Customer } from '../../interfaces/customer.inteface';
import { Restaurant } from '../../interfaces/restaurant.interface';
import { Product } from '../../interfaces/product.interface';
import { MessageService } from 'primeng/api';
import { LayoutComponent } from '../layout/layout.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [CardModule, CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, TableModule, DropdownModule, MultiSelectModule, LayoutComponent, RouterLink],
  providers: [OrderService, RestaurantService, ProductService, CustomerService],
  templateUrl: './order-create-dropdown.component.html',
  styleUrls: ['./order-create-dropdown.component.css']
})

export class OrderCreateComponent implements OnInit {

  orderForm!: FormGroup;
  customers$!: Observable<Customer[]>;
  restaurants$!: Observable<Restaurant[]>;
  products$!: Observable<Product[]>;


  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private restaurantService: RestaurantService,
    private productService: ProductService,
    private messageService: MessageService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

    this.orderForm = this.fb.group({
      customer: [null, Validators.required],
      restaurant: [null, Validators.required],
      products: this.fb.array([], Validators.required)
    });

    this.customers$ = this.customerService.getCustomers();
    this.restaurants$ = this.restaurantService.getRestaurants();
    this.products$ = this.productService.getProducts();


  }

  get productsArray(): FormArray {
    return this.orderForm.get('products') as FormArray;
  }

  addProduct(product: any) {
    this.productsArray.push(this.fb.group({
      product: [product, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [product.price]
    }));
  }

  removeProduct(index: number) {
    this.productsArray.removeAt(index);
  }


  onSubmit() {
    if (this.orderForm.valid) {
      console.log('Order submitted:', this.orderForm.value);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order Created Successfully' })
      this.productsArray.clear();
      this.orderForm.reset();
    }
  }

  onProductSelect(event: any): void {
    const selectedProducts = event.value;
    this.productsArray.clear();
    selectedProducts.forEach((product: Product) => this.addProduct(product));
  }

  createOrder() {
    this.router.navigate(['register']);
  }

}
