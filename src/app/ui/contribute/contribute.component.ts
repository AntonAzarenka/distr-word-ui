import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Contribute } from 'src/app/domain/contribute';
import { ContributeService } from 'src/app/service/contribute.service';


@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService,
              private contrService: ContributeService,
              public route: Router) {
  }
  dataSource: Contribute[];
  isLogged: boolean;
  displayedColumns: string[] = ['name', 'price'];

  ngOnInit(): void {
    this.checkLogged();
    this.getContributes();
  }

  checkLogged(): void{
    this.isLogged = this.tokenStorage.isLogged();
    if(!this.isLogged){
      this.route.navigateByUrl('/words')
    }
  }

  getContributes(): void {
    this.contrService.getContribute().subscribe((data: Contribute[]) => {
      this.dataSource = (data);
      console.log(this.dataSource);
    });
  }
}
