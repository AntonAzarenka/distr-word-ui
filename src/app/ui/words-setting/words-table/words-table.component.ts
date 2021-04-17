import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable } from 'rxjs';
import { WordService } from 'src/app/service/word.service';
import {Word} from '../../../domain/word';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WordEditModalComponent } from '../word-edit-modal/word-edit-modal.component';

@Component({
  selector: 'app-words-table',
  templateUrl: './words-table.component.html',
  styleUrls: ['./words-table.component.css']
})
export class WordsTableComponent implements OnInit {

  constructor(private wordService: WordService,  public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: Word[];

  displayedColumns: string[] = ['word', 'translate', 'edit', 'delete'];
  resultsLength = 0;

  isLoadingResults = true;
  isRateLimitReached = false;

  ngOnInit(): void {
    this.getAllWords();
  }

  getAllWords(): void {
    this.wordService.getWords().subscribe((data: any[]) => {
        this.dataSource = (data);
        this.isLoadingResults = false;
    });
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  openDialogEditWord(element: Word): void {
    const dialogRef = this.dialog.open(WordEditModalComponent, {
      width: '1000px',
      data: {uid: element.uid, word: element.word, translate: element.translate}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null){
        const word = new Word(result.uid, result.word, result.translate);
        this.save(word);
      }
    });
  }

  save(word: Word): void {
    this.wordService.edit(word).subscribe((data: Word) => {
      this.dataSource.push(data);
    });
  }

  delete(word: Word): void {
    console.log(this.isLoadingResults);
    this.wordService.delete(word.uid).subscribe();

    this.dataSource = this.dataSource.filter(item => {
       return item.uid !== word.uid;
      });
  }

  search(event): void{
    console.log(event.target.value);
    if (event.target.value === null){
      this.wordService.search(' ').subscribe((data: any[]) => {
        this.dataSource = data;
        console.log(data);
      });
    }
    this.wordService.search(event.target.value).subscribe((data: any[]) => {
      this.dataSource = data;
      console.log(data);
    });
  }
}
