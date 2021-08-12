import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Word} from 'src/app/domain/word';
import {WordService} from 'src/app/service/word.service';

interface Language {
  title: string;
  description: string;
}

interface Woordbook {
  id: string;
  code: string;
}

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  constructor(private wordService: WordService,
              private snackBar: MatSnackBar) {
  }

  languages: Language[] = [
    {title: 'RU', description: 'It will get only Russian words!'},
    {title: 'EN', description: 'It will get only English words!'},
    {title: 'ALL', description: 'It will get all languages words!'},
  ];

  wordbooks: Woordbook[] = [
    {id: 'Team Wordbook', code: 'TEAM_WORDBOOK'},
    {id: 'Personal Wordbook', code: 'PERSONAL_WORDBOOK'}// ,
    // {id: 'All Words in application', code: 'TEAM_WORDBOOK'}
  ];
  errorMessage = '';
  selectedLanguage = this.languages[2].title;
  selectedWordbook = this.wordbooks[0];

  // tslint:disable-next-line:new-parens
  wordTo: Word = new Word(' ', '', '', false);
  isTranslated = true;
  isDisabledGetWordButton = false;

  ngOnInit(): void {
  }

  getWord(): void {
    this.isTranslated = false;
    this.resetWord();
    this.wordService.getPersonalWord(this.selectedLanguage, this.selectedWordbook.code).subscribe((data: any) => {
      this.wordTo = (data);
    }, error => {
      this.errorMessage = error.error.message;
      this.showMessage(this.errorMessage);
    });
  }

  getTranslate(): void {
    this.isTranslated = true;
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'INFO', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4500,
    });
  }

  resetWord(): void {
    this.wordTo.word = '';
    this.wordTo.translate = '';
    this.wordTo.today = false;
    this.isTranslated = false;
  }

  addToWordbook(): void {
    this.wordService.save(this.wordTo).subscribe();
  }
}
