export class Word {
  uid: string;
  word: string;
  translate: string;

  constructor(id: string, word: string, trans: string){
    this.uid = id,
    this.word = word;
    this.translate = trans;
  }
}
