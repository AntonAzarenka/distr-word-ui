export class Word {
  id: number;
  word: string;
  translate: string;

  constructor(id: number, word: string, trans: string){
    this.id = id;
    this.word = word;
    this.translate = trans;
  }
}
