import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee';
import { Router } from '@angular/router';
import { SearchService } from '../../service/search.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { element } from 'protractor';

@Component({
  selector: 'app-create-employe',
  templateUrl: './create-employe.component.html',
  styleUrls: ['./create-employe.component.css']
})
export class CreateEmployeComponent implements OnInit {

  // private image: any;
  imageError: string;
  isImageSaved = false;
  cardImageBase64: string;
  imgResult = '';

  emailPattern = /\S+@\S+\.\S+/;

  data: Employee =
    {
      id_empleado: 0,
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

  // employeForm: FormGroup;

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
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit() {
  }

  handleImage() {
    document.getElementById('image').click();
  }

  // fileChangeEvent(fileInput: any) {

  //   const file = fileInput.target.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     console.log(reader.result);
  //   }
  // }

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

  saveForm() {

    if (this.employeForm.valid) {
      // console.log(this.data);
      this.searchService.postEmployee(this.data).subscribe(resp => {
        // console.log(resp);
      });
      this.router.navigate(['/employes']);
      this.employeForm.reset();

    }
  }
}
