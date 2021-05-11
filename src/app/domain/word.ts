export class Word {
  id: string;
  word: string;
  translate: string;
  today: boolean;

  constructor(id: string, word: string, trans: string, today: boolean) {
    this.id = id;
    this.word = word;
    this.translate = trans;
    this.today = today;
  }
}
