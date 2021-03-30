import {Component, OnInit} from '@angular/core';
import {ParticipantService} from '../../service/participant.service';
import {Participant} from '../../domain/participant';

import {WordService} from '../../service/word.service';
import {TokenStorageService} from '../../auth/token-storage.service';

interface Language {
  title: string;
  description: string;
}

interface WordTo {
  uid: string;
  word: string;
  translate: string;
}

@Component({
  selector: 'app-choose-words',
  templateUrl: './choose-words.component.html',
  styleUrls: ['./choose-words.component.css']
})
export class ChooseWordsComponent implements OnInit {

  constructor(private participantService: ParticipantService, private wordService: WordService,
              private tokenStorage: TokenStorageService) {
  }

  dataSource: WordTo;
  displayedColumns: string[] = ['word', 'translate'];

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
    this.isTranslated = false;
    this.wordService.getWord(this.selectedLanguage).subscribe((data: any) => {
      this.wordTo = (data);
      console.log(data);
    });
  }

  getTranslate(): void {
    this.checkLogged();
    this.isTranslated = true;
  }

  checkLogged(): void{
    this.isLogged = this.tokenStorage.isLogged();
  }
}
