import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Participant} from '../../domain/participant';
import {ParticipantService} from '../../service/participant.service';
import {WordEditModalComponent} from '../words-setting/word-edit-modal/word-edit-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ParticipantEditModalComponent} from './participant-edit-modal/participant-edit-modal.component';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService,
              private participantService: ParticipantService,
              public dialog: MatDialog) {
  }

  isLogged: boolean;

  dataSource: Participant[];

  displayedColumns: string[] = ['name', 'edit', 'delete'];

  ngOnInit(): void {
    this.checkLogged();
    this.getParticipants();
  }

  getParticipants(): void {
    this.participantService.getParticipants().subscribe((data: Participant[]) => {
      this.dataSource = data;
    });
  }

  delete(part: Participant): void {
    this.participantService.delete(part.id).subscribe();
    this.dataSource = this.dataSource.filter(item => {
      return item.id !== part.id;
    });
  }

  openDialogEditParticipant(element: Participant): void {
    const dialogRef = this.dialog.open(ParticipantEditModalComponent, {
      width: '800px',
      data: {id: element.id, name: element.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const part = new Participant(result.id, result.name);
        this.save(part);
      }
    });
  }

  save(part: Participant): void {
    this.participantService.edit(part).subscribe((data: Participant) => {
      this.dataSource.push(data);
    });
  }

  checkLogged(): void {
    this.isLogged = this.tokenStorage.isLogged();
  }
}
