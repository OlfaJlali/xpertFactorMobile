export class Document {
    constructor(
      public id: string,
      public buyerId: string,
      public number: Number,
      public date: Date,
      public ttc: Number,
      public ouvert: Number,
      public retenu: Number
    ) {}
  }
  