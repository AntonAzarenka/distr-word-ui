import {Word} from './word';
import {Participant} from './participant';

export class PaymentInformationTo {
  private wordTo: Word;
  private  participantTo: Participant;

  constructor(wordTo: Word, participantTo: Participant) {
    this.wordTo = wordTo;
    this.participantTo = participantTo;
  }
}
