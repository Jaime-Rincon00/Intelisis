import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../../service/search.service';
import { Employee } from '../../model/employee';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {

  data: Employee[];
  loader = false;
  constructor(
    private searchService: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

    this.activatedRoute.params.subscribe(params => {

      this.loader = true;
      this.searchService.getEmployees().subscribe(data => {
        console.log('constructor', data);
        this.loader = false;
        this.data = data;
      });
    });
  }

  ngOnInit() {

    this.searchService.refreshNeeded$.subscribe(() => {
      this.getAllEmploye();
    });
    this.getAllEmploye();

  }

  private getAllEmploye() {
    console.log('getAllEmployee')
    this.loader = true;
    this.searchService.getEmployees().subscribe(data => {
      // console.log('constructor', data);
      this.loader = false;
      this.data = data;
    });
  }

  newEmploye() {
    this.router.navigateByUrl('/create');
  }

  updateEmploye(matricula: number) {
    this.router.navigateByUrl(`/update/${matricula}`);
  }

  deleteEmploye(matricula: number) {
    this.activatedRoute.params.subscribe(params => {

      Swal.fire({
        title: `Deseas eliminar la matricula: ${matricula}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.searchService.deleteEmployee(matricula).subscribe(resp => {
            Swal.fire(
              'Se ha eliminado con exito',
              '',
              'success'
            );
          });
        }
      });

    });
  }
}

