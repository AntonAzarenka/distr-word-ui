import {Component, OnInit} from '@angular/core';
import {ParticipantService} from '../../service/participant.service';
import {Participant} from '../../domain/participant';

import {WordService} from '../../service/word.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Word} from '../../domain/word';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PaymentInformationTo} from '../../domain/paymentInformationTo';

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
              private tokenStorage: TokenStorageService, private snackBar: MatSnackBar) {
  }

  Collection: Array<Word> = new Array<Word>();

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
  selectedParticipant: Participant;
  currentParticipant: Participant;

  countOfWords = 1;
  errorMessage = '';

  isGetWord = false;
  timer = 0;

  // tslint:disable-next-line:new-parens
  money = new class implements Message {
    message: string;
    price: string;
  };


  // tslint:disable-next-line:new-parens
  wordTo: Word = new Word(' ', '', '', false);

  // timeLeft: number = 60;
  interval;

  // tslint:disable-next-line:new-parens

  ngOnInit(): void {
    this.getParticipants();
    this.checkLogged();
  }

  getParticipants(): void {
    this.checkLogged();
    this.participantService.getParticipants().subscribe((data: any[]) => {
      this.participants = (data);
      this.selectedParticipant = this.participants[0];
    });
  }

  getWord(): void {
    if (this.isGotWord){
      this.getTranslate();
    }
    this.pauseTimer();
    this.isGotWord = true;
    this.checkLogged();
    this.resetTable();
    this.resetWord();
    this.wordService.getWord(this.selectedLanguage, this.selectedParticipant.id).subscribe((data: any) => {
      this.wordTo = (data);
      setTimeout(() => {
        if (this.wordTo.today) {
          this.timer = 10;
          this.startTimer();
        } else {
          this.timer = 25;
          this.startTimer();

        }
      }, 500);
    }, error => {
      this.errorMessage = error.error.message;
      this.snackBar.open(this.errorMessage, 'INFO', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4500,
      });
    });
  }

  resetWord(): void {
    this.wordTo.word = '';
    this.wordTo.translate = '';
    this.wordTo.today = false;
    this.isTranslated = false;
    this.money.price = '';
  }

  getTranslate(): void {
    if (this.isGotWord) {
      this.currentParticipant = this.selectedParticipant;
      this.Collection[this.countOfWords - 1] = new Word(this.countOfWords.toString(), this.wordTo.word, this.wordTo.translate, false);
      this.dataSource.data = this.Collection;
      this.countOfWords = this.countOfWords + 1;
      this.isTranslated = true;
      this.pauseTimer();
    //  this.isGotWord = false;
    }
  }

  checkLogged(): void {
    this.isLogged = this.tokenStorage.isLogged();
  }

  resetTable(): void {
    if (this.currentParticipant !== this.selectedParticipant) {
      this.Collection = new Array<Word>();
      this.dataSource.data = this.Collection;
      this.countOfWords = 1;
    }
    this.money.message = '';
  }

  getMoney(): void {
    if (this.isGotWord) {
      this.wordService.getMoney(new PaymentInformationTo(this.wordTo, this.selectedParticipant)).subscribe((data: any) => {
        this.money = (data);
        this.isGotWord = false;
      });
      this.pauseTimer();
      setTimeout(() => {
        this.snackBar.open(this.money.message, 'INFO', {
          horizontalPosition: 'left',
          verticalPosition: 'top',
          duration: 4000,
        });
      }, 1000);
    } else {
      this.snackBar.open('Please get a word before take money', 'INFO', {
        horizontalPosition: 'left',
        verticalPosition: 'top',
        duration: 4000,
      });
    }
    this.getTranslate();
  }

  startTimer(): void {
    if (this.wordTo.today) {
      this.timer = 10;
    } else {
      this.timer = 23;
    }
    this.isGetWord = true;
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.getTranslate();
        this.isGotWord = true;
        this.getMoney();
        this.isGotWord = false;
      }
    }, 1000);
  }

  pauseTimer(): void {
    clearInterval(this.interval);
  }
}
