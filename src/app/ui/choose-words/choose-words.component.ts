import {Component, OnInit} from '@angular/core';
import {ParticipantService} from '../../service/participant.service';
import {Participant} from '../../domain/participant';

import {WordService} from '../../service/word.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Word} from '../../domain/word';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Language {
  title: string;
  description: string;
}

interface WordTo {
  uid: string;
  word: string;
  translate: string;
}

interface Message {
  message: string;
}

@Component({
  selector: 'app-choose-words',
  templateUrl: './choose-words.component.html',
  styleUrls: ['./choose-words.component.css'],
})
export class ChooseWordsComponent implements OnInit {

  constructor(private participantService: ParticipantService, private wordService: WordService,
              private tokenStorage: TokenStorageService,  private snackBar: MatSnackBar) {
  }

  Collection:Array<Word> = new Array<Word>();

  dataSource = new MatTableDataSource<Word>();
  displayedColumns: string[] = ['word', 'translate'];

  languages: Language[] = [
    {title: 'RU', description: 'It will get only Russian words!'},
    {title: 'EN', description: 'It will get only English words!'},
    {title: 'ALL', description: 'It will get all languages words!'},
  ];

  isTranslated = false;
  isLogged = false;
  isGotWord = false;

  selectedLanguage = this.languages[2].title;
  participants: Participant[];
  selectedParticipant: string;
  currentParticipant: string;
 
  countOfWords: number = 1;
  errorMessage = '';

  money = new class implements Message{
    message: string;
  };


  // tslint:disable-next-line:new-parens
  wordTo = new class implements WordTo {
    uid: string;
    word: string;
    translate: string;
  };

  // tslint:disable-next-line:new-parens

  ngOnInit(): void {
    this.getParticipants();
    this.checkLogged();
  }

  getParticipants(): void {
    this.checkLogged();
    this.participantService.getParticipants().subscribe((data: any[]) => {
      this.participants = (data);
      this.selectedParticipant = this.participants[0].id;
    },error=>{
      this.snackBar.open(error.error.message, 'INFO', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4500,
      }); 
    });
  }

  getWord(): void {
    this.isGotWord = true;
    this.checkLogged();
    this.resetTable();
    this.wordTo.word = '';
    this.wordTo.translate = '';
    this.isTranslated = false;
    this.wordService.getWord(this.selectedLanguage).subscribe((data: any) => {
      this.wordTo = (data);
    }, error => {
      this.errorMessage = error.error.message;
      this.snackBar.open(this.errorMessage, 'INFO', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4500,
      });    
    });
  }

  getTranslate(): void {
    if(this.isGotWord){
      this.currentParticipant = this.selectedParticipant;
      this.Collection[this.countOfWords-1] = new Word(this.countOfWords.toString(), this.wordTo.word, this.wordTo.translate);
      this.dataSource.data = this.Collection;
      this.countOfWords= this.countOfWords + 1;
      this.isTranslated = true;
    }
  }

  checkLogged(): void{
    this.isLogged = this.tokenStorage.isLogged();
  }

  resetTable() {
    if(this.currentParticipant != this.selectedParticipant){
      this.Collection = new Array<Word>();
      this.dataSource.data = this.Collection;
      this.countOfWords = 1;
      console.log(this.selectedParticipant)
    }
  }

  getMoney(): void {
    if(this.isGotWord){
      this.wordService.getMoney(this.wordTo.word, this.selectedParticipant).subscribe((data: any) => {
        this.money = (data);
      });
    } else {
      this.snackBar.open("Please get a word before take money", 'INFO', {
        horizontalPosition: 'left',
        verticalPosition: 'top',
        duration: 4000,
      });    
    }
  }
}
