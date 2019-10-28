import { Component, OnInit, Input } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/interfaces/employess.interface';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  @Input() employeeData: Employee =
    {
      id: '',
      employee_name: '',
      employee_salary: '',
      employee_age: '',
    };

  constructor(
              public rest: RestService,
              private route: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit() {
  }

  addProduct() {
    this.rest.addProduct(this.employeeData)
      .subscribe
      (
        (result) => this.router.navigate(['/product-details/' + 7988]),
        (err) => console.log(err)
      );
  }

}
