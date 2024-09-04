import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule],
  providers: [ProductService],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product!: Product;

  addToCart(product: Product) {
    console.log('Product added to cart:', product);
  }

  viewDetails(product: Product) {
    console.log('Viewing details for product:', product);
  }

}
