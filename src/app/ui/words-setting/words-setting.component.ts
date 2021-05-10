import { Component, OnInit } from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {WordService} from '../../service/word.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Word } from 'src/app/domain/word';
import { WordsTableComponent } from './words-table/words-table.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-words-setting',
  templateUrl: './words-setting.component.html',
  styleUrls: ['./words-setting.component.css']
})
export class WordsSettingComponent implements OnInit {

  constructor(private wordService: WordService,
              private tokenStorage: TokenStorageService,
              private wt: WordsTableComponent,
              private snackBar: MatSnackBar) { }

  selectedFiles: FileList = null;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  isLogged: boolean;
  isShowedAdding: boolean = false;
  isShowedUpload: boolean = false;

  word: string;
  translate: string;
  wordObject: Word;

  ngOnInit(): void {
    this.checkLogged();
  }

  // tslint:disable-next-line:typedef
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // tslint:disable-next-line:typedef
  upload() {
    this.progress.percentage = 0;
    if(this.selectedFiles !== null) {
      this.currentFileUpload = this.selectedFiles.item(0);
      this.wordService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.snackBar.open('File is completely uploaded!', 'INFO', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 4000
          });
          this.currentFileUpload = null;
        }
      });
      this.selectedFiles = null;
      this.isShowedUpload = false;
    } else {
      this.snackBar.open("Please choose a file to upload", 'INFO', {
        horizontalPosition: 'left',
        verticalPosition: 'top',
        duration: 4000,
      });
    }
  }

  checkLogged(): void{
    this.isLogged = this.tokenStorage.isLogged();
  }

  showUpload(): void {
    this.isShowedUpload = true;
  }

  showAdding(): void {
    this.isShowedAdding = true;
  }

  save(): void {
    this.wt.save(new Word('', this.word, this.translate, false));
    this.isShowedAdding = false;
    window.location.reload();
  }

  hideAdding(): void {
    this.isShowedAdding = false;
  }

  hideUpload(): void {
    this.isShowedUpload = false;
  }
}
