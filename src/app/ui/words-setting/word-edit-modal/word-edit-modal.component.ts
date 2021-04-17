import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


interface DialogCreateDetailData {
  uid: string;
  word: string;
  translate: string;
}

@Component({
  selector: 'app-word-edit-modal',
  templateUrl: './word-edit-modal.component.html',
  styleUrls: ['./word-edit-modal.component.css']
})
export class WordEditModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WordEditModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogCreateDetailData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
