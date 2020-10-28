import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';

import { SearchService } from '../../service/search.service';
import { Employee } from '../../model/employee';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-employe',
  templateUrl: './update-employe.component.html',
  styleUrls: ['./update-employe.component.css']
})
export class UpdateEmployeComponent {

  data: Employee =
    {
      id_empleado: 1,
      nombre: '',
      puesto: '',
      edad: 0,
      direccion: '',
      correo: '',
      telefono: '',
      fecha_ingreso: '',
      matricula: 0,
      foto_perfil: ''
    };

  imageError: string;
  isImageSaved = false;
  cardImageBase64: string;
  imgResult = '';

  emailPattern = /\S+@\S+\.\S+/;

  imageUrl: any;

  employeForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    puesto: new FormControl('', [Validators.required]),
    edad: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    telefono: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    matricula: new FormControl('', [Validators.required, Validators.minLength(4)]),
    image: new FormControl(''),
  });

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private domSanitizer: DomSanitizer) {

    this.activatedRouter.params.subscribe(params => {
      this.searchService.getEmployeeById(params['id']).subscribe(data => {

        const imageBinary = data[0].foto_perfil;
        this.imageUrl = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + imageBinary);

        this.data = data[0];
      });
    });
  }

  handleImage() {
    document.getElementById('image').click();
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {

      // Size Filter Bytes
      const MAX_SIZE = 20971520;
      const ALLOWED_TYPES = ['image/png', 'image/jpeg'];
      const MAX_HEIGHT = 15200;
      const MAX_WIDTH = 25600;

      if (fileInput.target.files[0].size > MAX_SIZE) {
        this.imageError =
          'El tamado maximo permitido es ' + MAX_SIZE / 1000 + 'Mb';
        return false;
      }
      if (!_.includes(ALLOWED_TYPES, fileInput.target.files[0].type)) {
        this.imageError = 'Solo se permiten imagenes ( JPG | PNG )';
        return false;
      }

      // convercion base64
      const reader = new FileReader();
      reader.readAsDataURL(fileInput.target.files[0]);
      reader.onload = (e: any) => {
        // console.log(reader.result);
        // console.log('impresion de this', this.data);
        let img = reader.result.toString();

        if (!img.includes('data:image/jpeg;base64,')) {
          this.imgResult = img.slice(22);
        } else {

          this.imgResult = img.slice(23);

        }
        this.data.foto_perfil = this.imgResult;
        // console.log('resultado', imgResult);

        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          // console.log(img_height, img_width);


          if (img_height > MAX_HEIGHT && img_width > MAX_WIDTH) {
            this.imageError =
              'Maximum dimentions allowed ' +
              MAX_HEIGHT +
              '*' +
              MAX_WIDTH +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };
    }
  }

  cancelar() {
    this.router.navigateByUrl('/employe');
  }

  saveForm(matricula: number, data: any) {
    this.activatedRouter.params.subscribe(params => {

      this.searchService.putEmployee(matricula, data).subscribe(resp => {
        Swal.fire(
          'El registro se actualizo con exito',
          '',
          'success'
        );
        this.router.navigateByUrl('/employe');
      });

    });
    // console.log(matricula, data);
  }

}
