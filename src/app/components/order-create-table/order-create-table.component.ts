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
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../interfaces/order.interface';
import { OrderStatus } from '../../enums/order-status.enum';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-order-create-v2',
  standalone: true,
  imports: [ButtonModule, InputTextModule, TableModule, LayoutComponent, CommonModule, ReactiveFormsModule, DialogModule],
  providers: [CustomerService, RestaurantService, ProductService, OrderService, ErrorHandlerService],
  templateUrl: './order-create-table.component.html',
  styleUrl: './order-create-table.component.css'
})
export class OrderCreateV2Component {

  form!: FormGroup;

  displayCancelDialog: boolean = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private restaurantService: RestaurantService,
    private productService: ProductService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      customerId: [null, Validators.required],
      customerName: [{ value: '', disabled: true }],
      restaurantId: [null, Validators.required],
      restaurantName: [{ value: '', disabled: true }],
      product: [null, Validators.required ],
      productQuantity: [null, Validators.required],
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
    this.form.get('customerId')!.valueChanges.subscribe((customerId) => {
      if (customerId) {
        this.customerService.getCustomerById(customerId).subscribe(
          {
            next: (data) => {
              this.form.patchValue({ customerName: data.name });
            },
            error: (error) => {
              this.errorHandler.handleError(error, `Customer with ID ${customerId} does not exist.`);
              this.form.patchValue({ restaurantName: null });
            }
          });
      }
    });

    this.form.get('restaurantId')!.valueChanges.subscribe((restaurantId) => {
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
        this.productService.getProductById(productId).subscribe(
          {
            next: (data) => {
              this.form.patchValue({
                productName: data.name,
                productPrice: data.price
              });
            },
            error: (error) => {
              this.errorHandler.handleError(error, `Product with ID ${productId} does not exist.`);
              this.form.patchValue({ productName: null, productPrice: null });
            }
          }
        );
      }
    });
  }

  get customer() {
    return this.form.controls['customerId'];
  }

  get restaurant() {
    return this.form.controls['restaurantId'];
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
        productId: [product],
        name: [productName],
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

  onSubmit(): void {
    // if (this.form.valid) {
 
      const orderData = {
        customerId: this.form.get('customerId')?.value,
        restaurantId: this.form.get('restaurantId')?.value,
        items: this.form.get('items')?.value,
        status: 'PENDING',
      };
  
      
      this.orderService.createOrder(orderData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Order Created',
            detail: 'The order has been successfully created!',
          });
          this.router.navigate(['/orders']);
        },
        error: (err) => {
          console.error('Error creating the order:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create the order. Please try again.',
          });
        }
      });
    // } else {
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'Validation Error',
    //     detail: 'Please fill in all required fields correctly.',
    //   });
    // }
  }


  setOrderItems(items: any[]) {
    const itemsFormArray = this.form.get('items') as FormArray;

    itemsFormArray.clear();

    items.forEach(item => {

      const itemGroup = this.fb.group({
        id: item.id,
        price: item.price,
        quantity: [item.quantity, Validators.required],
        name: item.name,
      })

      itemsFormArray.push(itemGroup);

    });

    this.form.updateValueAndValidity();

  }

  loadOrder(orderId: number) {
    this.orderService.findOrderById(orderId).subscribe({
      next: (order: Order) => {
        this.form.patchValue({
          id: order.id,
          customerId: order.customerId,
          customerName: order.customerName,
          restaurantId: order.restaurantId,
          restaurantName: order.restaurantName,
          status: order.status,
          total: order.total,
          createdAt: order.createdAt,
        });

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

  showCancelDialog(): void {
    this.displayCancelDialog = true;
  }

  onConfirmCancel(orderId: number | null): void {
    if (orderId !== null) {
      this.cancelOrder(orderId);
    }
    this.displayCancelDialog = false;
  }

  onRejectCancel(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Cancelled',
      detail: 'Cancellation action aborted',
    });
    this.displayCancelDialog = false;
  }

  cancelOrder(orderId: number): void {
    if (orderId) {
      this.orderService.cancelOrderById(orderId).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order successfully cancelled',
          });
          this.router.navigate(['/orders']);
        },
        error: (err) => {
          console.error('Error cancelling the order:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to cancel order',
          });
        },
      });
    } else {
      console.error('Invalid Order ID');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Order ID is missing or invalid',
      });
    }
  }
}