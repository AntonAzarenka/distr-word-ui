import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { first } from 'rxjs/operators';
import { ParticipantService } from 'src/app/service/participant.service';
import { SignUpInfo } from 'src/app/auth/sign-up.info';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  teams: string[];
  teamName: string;
  
  isLogged: boolean;
  constructor(public route: Router,
              private authService: AuthService,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authService.getTeam().subscribe((data:any) => {
      this.teams = data;
      this.teamName = this.teams[0];
    })
  }

  onSubmit() {

    this.signupInfo = new SignUpInfo(
      this.form.username,
      this.form.password,
      this.teamName);

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
