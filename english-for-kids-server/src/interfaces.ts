export interface CardInfo {
  category: string,
  word: string,
  translation: string,
  image: string,
  audioSrc: string,
  trainModeTurns: number,
  trueChoices: number,
  falseChoices: number,
  trueChoicesPer: number,
}

export interface CategoryInfo {
  _id?: string,
  category: string,
  id: number,
  cards: CardInfo[],
}
