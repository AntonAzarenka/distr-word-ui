import {Component, OnInit, ViewChild} from '@angular/core';
import {WordService} from '../../../service/word.service';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Word} from '../../../domain/word';
import {WordEditModalComponent} from '../../words-setting/word-edit-modal/word-edit-modal.component';

@Component({
  selector: 'app-user-wordbook',
  templateUrl: './user-wordbook.component.html',
  styleUrls: ['./user-wordbook.component.css']
})
export class UserWordbookComponent implements OnInit {

  constructor(private wordService: WordService,  public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: Word[];

  displayedColumns: string[] = ['word', 'translate', 'edit', 'delete'];

  isLoadingResults = true;

  ngOnInit(): void {
    this.getAllWords();
  }

  getAllWords(): void {
    this.wordService.getWords().subscribe((data: any[]) => {
      this.dataSource = (data);
      this.isLoadingResults = false;
      console.log(data);
    });
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  openDialogEditWord(element: Word): void {
    const dialogRef = this.dialog.open(WordEditModalComponent, {
      width: '1000px',
      data: {uid: element.id, word: element.word, translate: element.translate}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const word = new Word(result.uid, result.word, result.translate, false);
        this.edit(word);
      }
    });
  }

  edit(word: Word): void {
    console.log(word);
    this.wordService.edit(word).subscribe(data => {
      this.getAllWords();
    });
  }

  save(word: Word): void {
    console.log(word);
    this.wordService.save(word).subscribe((data: any) => {
      this.dataSource = this.dataSource.filter(item => {
        return item !== null;
      });
    });
  }

  delete(word: Word): void {
    console.log(word.id);
    this.wordService.delete(word.id).subscribe();
    this.dataSource = this.dataSource.filter(item => {
      return item.id !== word.id;
    });
  }

  search(event): void{
    console.log(event.target.value);
    if (event.target.value === null){
      this.wordService.search(' ').subscribe((data: any[]) => {
        this.dataSource = data;
      });
    }
    this.wordService.search(event.target.value).subscribe((data: any[]) => {
      this.dataSource = data;
    });
  }

}
