import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  previousKeyword: string = '';

  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  // Method will get invoked once we subscribe, and its an asynchronus method
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProduct();
    }
    else {
      this.handleListProduct();
    }
  }

  handleSearchProduct() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have a different keyword than previous
    // then set pageNumber to 1

    if(this.previousKeyword != keyword){
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;

    // now search for the products using keyword
    this.productService.searchProductsPaginate(this.pageNumber-1, this.pageSize, keyword).subscribe(this.processResult());
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

    // Check if we have a different category than previous
    // Note: Anguar will reuse a component if it is currently being viewed

    // if we have a different category id than previous
    // then set pageNumber back to 1

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    // console.log(`currentCategoryId=${this.currentCategoryId}, pageNumber${this.pageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(this.processResult());
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: any) {
    this.pageSize = pageSize.target.value;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product){
    console.log(product.name, product.unitPrice);

    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }
}