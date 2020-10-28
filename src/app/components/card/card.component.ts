import { Component } from '@angular/core';
import { SearchService } from '../../service/search.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {


  data: any = {};
  imageUrl: any;

  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer) {

    this.activatedRoute.params.subscribe(resp => {
      this.searchService.getEmployeeById(parseInt(resp['id'])).subscribe(data => {
        const imageBinary = data[0].foto_perfil;
        this.imageUrl = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + imageBinary);

        this.data = data[0];

        // console.log(data[0]);

      });
    });
  }
}
