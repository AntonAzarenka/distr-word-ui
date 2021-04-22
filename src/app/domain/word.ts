export class Word {
  id: string;
  word: string;
  translate: string;

  constructor(id: string, word: string, trans: string){
    this.id = id,
    this.word = word;
    this.translate = trans;
  }
}
