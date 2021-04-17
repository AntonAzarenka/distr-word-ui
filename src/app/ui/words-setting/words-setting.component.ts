import { Component, OnInit } from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {WordService} from '../../service/word.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Word } from 'src/app/domain/word';

@Component({
  selector: 'app-words-setting',
  templateUrl: './words-setting.component.html',
  styleUrls: ['./words-setting.component.css']
})
export class WordsSettingComponent implements OnInit {

  constructor(private wordService: WordService, private tokenStorage: TokenStorageService) { }

  selectedFiles: FileList;
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

    this.currentFileUpload = this.selectedFiles.item(0);
    this.wordService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
    this.selectedFiles = undefined;
    this.isShowedUpload = false;
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
    this.wordService.save(new Word('',this.word, this.translate)).subscribe((data: Word)=> {
      this.wordObject = data;
    })
    this.isShowedAdding = false;
  }
}
