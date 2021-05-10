export class Word {
  id: string;
  word: string;
  translate: string;
  isToday: boolean;

  constructor(id: string, word: string, trans: string, isToday: boolean) {
    this.id = id;
    this.word = word;
    this.translate = trans;
    this.isToday = isToday;
  }
}
