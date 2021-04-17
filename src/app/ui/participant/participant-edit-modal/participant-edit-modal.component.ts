import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

interface DialogCreateDetailData {
  id: string;
  name: string;
}

@Component({
  selector: 'app-participant-edit-modal',
  templateUrl: './participant-edit-modal.component.html',
  styleUrls: ['./participant-edit-modal.component.css']
})
export class ParticipantEditModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ParticipantEditModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogCreateDetailData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
