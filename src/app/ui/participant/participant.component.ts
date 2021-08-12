import {Component, OnInit, PipeTransform} from '@angular/core';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Participant} from '../../domain/participant';
import {ParticipantService} from '../../service/participant.service';
import {MatDialog} from '@angular/material/dialog';
import {ParticipantEditModalComponent} from './participant-edit-modal/participant-edit-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})

export class ParticipantComponent implements OnInit{

  constructor(private tokenStorage: TokenStorageService,
              private participantService: ParticipantService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  isLogged: boolean;

  dataSource: Participant[];
  isShowedAdding: boolean;

  name: string;

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
        this.save(part, true);
      }
    });
  }

  save(part: Participant, isUpdate: boolean): void {
    if (isUpdate){
      this.participantService.edit(part).subscribe((data: any) => {
        this.getParticipants();
      });
    } else {
      this.participantService.save(part).subscribe((data: any) => {
        this.getParticipants();
      });
    }
    this.isShowedAdding = false;
  }

  addParticipant(): void {
    this.save(new Participant(null, this.name), false);
  }

  checkLogged(): void {
    this.isLogged = this.tokenStorage.isLogged();
  }

  showAdding(): void {
    this.isShowedAdding = true;
  }

  hide(): void {
      this.isShowedAdding = false;
  }
}
