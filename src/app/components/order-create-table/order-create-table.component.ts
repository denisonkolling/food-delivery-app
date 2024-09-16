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
import { REGEX } from '../../shared/constants/regex.constants';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../interfaces/order.interface';
import { OrderStatus } from '../../enums/order-status.enum';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-order-create-v2',
  standalone: true,
  imports: [ButtonModule, InputTextModule, TableModule, LayoutComponent, CommonModule, ReactiveFormsModule],
  providers: [CustomerService, RestaurantService, ProductService, OrderService, ErrorHandlerService],
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
    private orderService: OrderService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      customer: [null, Validators.required],
      customerName: [{ value: '', disabled: true }],
      restaurant: [null, Validators.required],
      restaurantName: [{ value: '', disabled: true }],
      product: ['', [Validators.required, Validators.pattern(REGEX.NUMBER)]],
      productQuantity: ['', [Validators.required, Validators.pattern(REGEX.NUMBER)]],
      productName: [{ value: '', disabled: true }],
      productPrice: [{ value: '', disabled: true }],
      items: this.fb.array([]),
      status: ['']
    });

    this.route.paramMap.subscribe((params) => {
      const orderId = Number(params.get('id'));
      if (orderId) {
        this.loadOrder(orderId);
      }
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
        this.restaurantService.getRestaurantById(restaurantId).subscribe({
          next: (data) => {
            this.form.patchValue({ restaurantName: data.name });
          },
          error: (error) => {
            this.errorHandler.handleError(error, `Restaurant with ID ${restaurantId} does not exist.`);
            this.form.patchValue({ restaurantName: null });
          }
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

  get itemsArray(): FormArray<FormGroup> {
    return this.form.get('items') as FormArray<FormGroup>;
  }

  get productQuantity() {
    return this.form.controls['productQuantity']
  }

  get orderStatus() {
    return this.form.get('status')?.value
  }

  addItem(): void {

    if (this.form.get('product')?.valid && this.form.get('productQuantity')?.valid) {

      const product = this.form.get('product')!.value;
      const productName = this.form.get('productName')!.value;
      const productQuantity = this.form.get('productQuantity')!.value;
      const productPrice = this.form.get('productPrice')!.value;

      const newItem = this.fb.group({
        id: [this.itemsArray.length + 1],
        product: this.fb.group({ id: [product], name: [productName] }),
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
    } else {
      return
    }
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
    console.log(this.form.value);
  }


  setOrderItems(items: any[]) {
    const itemsFormArray = this.form.get('items') as FormArray;

    itemsFormArray.clear();

    items.forEach(item => {

      const itemGroup = this.fb.group({
        id: [item.id],
        price: [item.price],
        quantity: [item.quantity, Validators.required],
        product: this.fb.group({
          id: [item.product.id],
          name: [item.product.name]
        })
      });

      itemsFormArray.push(itemGroup);

    });

    this.form.updateValueAndValidity();

  }

  loadOrder(orderId: number) {
    this.orderService.findOrderById(orderId).subscribe({
      next: (order: Order) => {
        console.log('Order Service Data Received', order);
        this.form.patchValue({
          id: order.id,
          customer: order.customer.id,
          restaurant: order.restaurant.id,
          status: order.status,
          total: order.total,
          createdAt: order.createdAt,
        });

        this.form.get('customerName')?.setValue(order.customer.name);
        this.form.get('restaurantName')?.setValue(order.restaurant.name);

        this.setOrderItems(order.items);

      },
      error: (err) => {
        console.error('Error loading order:', err);
      }
    });
  }

  canModifyOrder(): boolean {
    return this.orderStatus === OrderStatus.PENDING ||
      this.orderStatus === '';
  }

  isOrderCancelledOrCompleted(): boolean {
    return [OrderStatus.CANCELLED, OrderStatus.COMPLETED].includes(this.orderStatus);
  }
}
