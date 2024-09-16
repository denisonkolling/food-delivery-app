import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProductService } from '../../services/product.service';
import { MessageService } from 'primeng/api';
import { Category } from '../../interfaces/category.interface';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [LayoutComponent, CommonModule, ReactiveFormsModule, CardModule, ButtonModule, InputTextModule, MultiSelectModule],
  providers: [CurrencyPipe, ProductService, RestaurantService],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  productForm!: FormGroup;
  categories$!: Observable<Category[]>;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private currencyPipe: CurrencyPipe,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private restaurantService: RestaurantService,
  ) {

  }

  ngOnInit(): void {

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      restaurant: ['', Validators.required],
      restaurantName: [{ value: '', disabled: true }],
      imageUrl: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      category: this.fb.array([], Validators.required),
    });

    this.categories$ = this.categoryService.getCategories();

    this.onChanges();

  }

  get name() {
    return this.productForm.controls['name'];
  }

  get price() {
    return this.productForm.controls['price'];
  }

  get description() {
    return this.productForm.controls['description'];
  }

  get restaurant() {
    return this.productForm.controls['restaurant'];
  }

  get category() {
    return this.productForm.controls['category'];
  }

  get imageUrl() {
    return this.productForm.controls['imageUrl'];
  }

  get categoryArray(): FormArray {
    return this.productForm.get('category') as FormArray;
  }

  onSubmit() {
    if (this.productForm.valid) {
      let formData = { ...this.productForm.value };

      if (typeof formData.price === 'string' && formData.price.startsWith('$')) {
        formData.price = formData.price.replace(/[$,]/g, '');
      }

      formData.price = parseFloat(formData.price);

      this.productService.createProduct(formData).subscribe({
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while creating the product. Please try again.' });
        },
        complete: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product created successfully' })
          this.productForm.reset();
        }
      });
    }
  }

  formatCurrency() {
    let value = this.productForm.get('price')?.value;

    if (typeof value === 'string' && value.startsWith('$')) {
      value = value.replace(/[$,]/g, '');
    }

    if (value) {
      const numericValue = parseFloat(value);
      const formattedValue = this.currencyPipe.transform(numericValue, 'USD', 'symbol', '1.0-2');
      this.productForm.get('price')?.setValue(formattedValue, { emitEvent: false });
    }
  }

  onCategorySelect(event: any): void {
    const selectedProducts = event.value;
    this.categoryArray.clear();
    selectedProducts.forEach((category: Category) => this.addCategory(category));
  }


  addCategory(category: any) {
    this.categoryArray.push(this.fb.control(category.id));
  }


  onChanges(): void {
    this.productForm.get('restaurant')!.valueChanges.subscribe((restaurantId) => {
      if (restaurantId) {
        this.restaurantService.getRestaurantById(restaurantId).subscribe({
          next: (data) => {
            this.productForm.patchValue({ restaurantName: data.name });
          },
          error: (error) => {
            if (error.status === 404) {
              this.messageService.add({
                severity: 'error',
                summary: 'Restaurant Not Found',
                detail: `Restaurant with ID ${restaurantId} does not exist.`
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'An error occurred while fetching the restaurant. Please try again.'
              });
            }
            this.productForm.patchValue({ restaurantName: null });
          }
        });
      }
    });
  }

}
