import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { first } from 'rxjs/operators';
import { ParticipantService } from 'src/app/service/participant.service';
import { SignUpInfo } from 'src/app/auth/sign-up.info';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Participant } from 'src/app/domain/participant';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  isChoosedTeam = false;

  teams: string[];
  participants: Participant[];
  teamName: string;
  name: string;

  isLogged: boolean;
  constructor(public route: Router,
              private authService: AuthService,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authService.getTeams().subscribe((data:any) => {
      this.teams = data;
      this.teamName = this.teams[0];
    });
  }

  getParticipants(){
   this.authService.getParticipantsOfTeam(this.teamName).subscribe((data: any[]) => {
     this.participants = data;
     this.name = this.participants[0].name;
     this.isChoosedTeam = true;
   },
   error => {
    this.errorMessage = error.error.message;
    this.isSignUpFailed = true;
    this.snackBar.open(error.error.message, 'ERROR', {
      duration: 5000,
    });
  }
   );
  }

  onSubmit() {
    this.signupInfo = new SignUpInfo(
      this.form.username,
      this.form.password,
      this.teamName,
      this.name);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        this.snackBar.open(error.error.message, 'ERROR', {
          duration: 5000,
        });
      }
    );
  }

}
