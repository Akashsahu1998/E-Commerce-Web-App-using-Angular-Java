import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;  
  searchNode: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  // Method will get invoked once we subscribe, and its an asynchronus method
  listProducts() {
    this.searchNode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchNode) {
      this.handleSearchProduct();
    }
    else {
      this.handleListProduct();
    }
  }

  handleSearchProduct() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // now search for the products using keyword
    this.productService.searchProducts(keyword).subscribe(data => {
      this.products = data;
    })
  }

  handleListProduct() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string and convert to a number using the '+' symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // not category id available, default to category id is 1
      this.currentCategoryId = 1;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(data => {
      this.products = data;
    })
  }

}


