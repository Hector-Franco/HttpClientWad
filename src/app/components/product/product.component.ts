import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/interfaces/employess.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: string ;

  constructor(public rest: RestService,
              private route: ActivatedRoute,
              private router: Router) {
                console.log('Inicializado PRODUCTO');
               }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.rest.getProducts()
      .subscribe(
        (data = {}) => {
          console.log(data);
          this.products = data;
        }
      );
  }

  add() {
    this.router.navigate(['/product-add']);
  }

  delete(id: string) {
    this.rest.deleteProduct(id)
      .subscribe(
        (res) => {
          this.getProducts();
        },
        (error) => console.log(error)
      );
  }

}
