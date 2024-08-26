import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [LayoutComponent, CommonModule, ReactiveFormsModule, CardModule, ButtonModule, InputTextModule],
  providers: [CurrencyPipe, ProductService],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, private currencyPipe: CurrencyPipe) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [1, [Validators.required, Validators.min(0.01)]],
    });
  }

  get name() {
    return this.productForm.controls['name'];
  }

  get price() {
    return this.productForm.controls['price'];
  }

  onSubmit() {
    if (this.productForm.valid) {
      let formData = { ...this.productForm.value };

      if (typeof formData.price === 'string' && formData.price.startsWith('$')) {
        formData.price = formData.price.replace(/[$,]/g, '');
      }

      formData.price = parseFloat(formData.price);

      this.productService.addProduct(formData).subscribe(
        response => {
          console.log('Produto adicionado com sucesso:', response);
        },
        error => {
          console.error('Erro ao adicionar o produto:', error);
        }
      );
    } else {
      console.log('Formulário inválido');
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
}
