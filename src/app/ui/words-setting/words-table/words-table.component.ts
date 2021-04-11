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

export interface WordsSett {
  items: Word[];
  total_count: number;
}

@Component({
  selector: 'app-words-table',
  templateUrl: './words-table.component.html',
  styleUrls: ['./words-table.component.css']
})
export class WordsTableComponent implements OnInit {

  constructor(private wordService: WordService) { }

  ngOnInit(): void {
    this.getAllWords();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: Observable<WordsSett>;
  displayedColumns: string[] = ['word', 'translate', 'edit', 'delete'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  getAllWords() {
    this.wordService.getWords().subscribe((data: Observable<WordsSett>) => {
        this.dataSource = (data);
        console.log(data);
        this.isLoadingResults = false;
    })
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  editWord(id: Word){
    console.log(id)
  }

  search(event){
    console.log(event.target.value);
    if(event.target.value === null){
      this.wordService.search(" ").subscribe((data: Observable<WordsSett>) => {
        this.dataSource = data;
        console.log(data);
      })
    } 
    this.wordService.search(event.target.value).subscribe((data: Observable<WordsSett>) => {
      this.dataSource = data;
      console.log(data);
    })
  }
}
