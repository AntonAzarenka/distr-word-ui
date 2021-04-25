import { Component, OnInit } from '@angular/core';
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
              private contrService: ContributeService) { 
                
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
  }

  getContributes(): void {
    this.contrService.getContribute().subscribe((data: Contribute[]) => {
      this.dataSource = (data);
      console.log(this.dataSource)
    });
  }
}
