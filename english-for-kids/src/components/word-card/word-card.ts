import './word-card.scss';
import { CardInfo } from "../../interfaces";
import { BaseComponent } from "../base-component";

export class WordCard extends BaseComponent {
  constructor(card: CardInfo) {
    super('div', ['word-card']);
    this.element.setAttribute('id', `word-card-${card.word}`);
    this.element.innerHTML = `
      <div class="word-card__main-view" id="main-view-${card.word}">
        <p class="word-card__title">Word: <span class="word-card__content">${card.word}</span></p>
        <p class="word-card__title">Translation: <span class="word-card__content">${card.translation}</span></p>
        <p class="word-card__title">Audio: <div class="word-card__audio" data-src="${card.audioSrc}"></div></p>
        <p class="word-card__title">Image: </p>
        <div class="word-card__image" style="background-image: url('${card.image}');"></div>
        <button class="word-card__change-btn" data-id="${card.word}">Change</button>
        <div class="word-card__delete-btn" data-id="${card.word}"></div>
      </div>
      <div class="word-card__update-view" id="update-view-${card.word}">
        <fieldset class="word-card__fieldset">
          <legend class="word-card__legend">Word:</legend>
          <input class="word-card__input" type="text" value="${card.word}" id="card-word-input-${card.word}">
        </fieldset>
        <fieldset class="word-card__fieldset">
          <legend class="word-card__legend">Translation:</legend>
          <input class="word-card__input" type="text" value="${card.translation}" id="card-translation-input-${card.translation}">
        </fieldset>
        <div class="file-input" id="audio-input-${card.word}">
          <p class="file-input__title">Sound: <p>
          <label class="file-input__label" for="audio-input-${card.word}"></label>
          <input type="file" class="file-input__input" id="audio-input-${card.word}">
        </div>
        <div class="file-input">
          <p class="file-input__title">Image: <p>
          <label class="file-input__label" for="image-input-${card.word}"></label>
          <input type="file" class="file-input__input" id="image-input-${card.word}">
        </div>
        <button class="word-card__cancel-btn" data-id="${card.word}">Cancel</button>
      </div>
    `;
  }
}
