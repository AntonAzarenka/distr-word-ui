import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContributeService } from 'src/app/service/contribute.service';

@Component({
  selector: 'app-personal-contribute',
  templateUrl: './personal-contribute.component.html',
  styleUrls: ['./personal-contribute.component.css']
})
export class PersonalContributeComponent implements OnInit {
  @Input() participantId: string;

  constructor(private contributeService: ContributeService, private snackBar: MatSnackBar) { }
  money: string;

  ngOnInit(): void {
    console.log(this.participantId);
  }

  save() {
    console.log(this.money)
    this.contributeService.savePayed(this.money, this.participantId).subscribe(data=> {
      this.back();
    },
    error => {
      this.snackBar.open(error.error.message, 'ERROR', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
      });
    });
  }

  back() {
    window.location.reload();
  }
}
