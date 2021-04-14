import {Component, OnInit} from '@angular/core';
import {ParticipantService} from '../../service/participant.service';
import {Participant} from '../../domain/participant';

import {WordService} from '../../service/word.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Word} from '../../domain/word';
import {
  AfterContentInit,
  ContentChildren,
  Input,
  AfterViewInit,
  QueryList,
  ViewChild,
  ContentChild,
} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {
  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';

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
              private tokenStorage: TokenStorageService) {
  }

  Collection:Array<Word> = new Array<Word>();

  dataSource = new MatTableDataSource<Word>();
  displayedColumns: string[] = ['id','word', 'translate'];

  languages: Language[] = [
    {title: 'RU', description: 'It will get only Russian words!'},
    {title: 'EN', description: 'It will get only English words!'},
    {title: 'ALL', description: 'It will get all languages words!'},
  ];

  selectedLanguage = this.languages[2].title;
  participants: Participant[];
  selectedParticipant: string;
  isTranslated = false;
  isLogged = false;
  countOfWords: number = 1;

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
      console.log(data);
      this.participants = (data);
      this.selectedParticipant = this.participants[0].id;
    });
  }

  getWord(): void {
    this.checkLogged();
    this.wordTo = null;
    this.isTranslated = false;
    this.wordService.getWord(this.selectedLanguage).subscribe((data: any) => {
      this.wordTo = (data);
    });
  }

  getTranslate(): void {
    this.Collection[this.countOfWords-1] = new Word(this.countOfWords.toString(), this.wordTo.word, this.wordTo.translate);
    this.dataSource.data = this.Collection;
    this.countOfWords= this.countOfWords + 1;
    this.isTranslated = true;
  }

  checkLogged(): void{
    this.isLogged = this.tokenStorage.isLogged();
  }

  resetTable(skill: any) {
  this.Collection = new Array<Word>();
   this.dataSource.data = this.Collection;
   this.countOfWords=1;
  } 

  getMoney(): void {
    this.wordService.getMoney().subscribe((data: any) => {
      console.log(data);
      this.money = (data);
    });
  }
}
