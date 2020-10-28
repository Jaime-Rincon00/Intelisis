import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  matricula: string;

  constructor(
    private router: Router,
    private searchService: SearchService
  ) { }

  buscar() {
    this.searchService.getEmployeeById(parseInt(this.matricula)).subscribe(resp => {

      if (!resp['codigo_error']) {

        this.router.navigateByUrl(`/employe/${this.matricula}`);

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: resp['error']
        });
      }
    });

  }



}
