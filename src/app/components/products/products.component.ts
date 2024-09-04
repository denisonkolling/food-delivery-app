import { Component, OnInit, Output } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { CommonEngine } from '@angular/ssr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [LayoutComponent, ProductCardComponent, CommonModule],
  providers: [ProductService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  @Output()
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (data) => this.products = data || []
    );
  }


}
