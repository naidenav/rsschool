import './word-editor.scss';
import { createCard, deleteCard, getCategory, updateCard, uploadAudio, uploadImage } from "../../REST-api";
import { BaseComponent } from "../base-component";
import { CLASS_NAMES } from '../../constants';
import { CardInfo, CategoryInfo } from '../../interfaces';
import { clear, getNewWord, playAudio, removeCardEditMode, setCardEditMode } from '../utils';
import { App } from '../../app';
import { WordCard } from '../word-card/word-card';

export class WordEditor extends BaseComponent {
  addWordCard: BaseComponent;

  currentCategory: CategoryInfo | null = null;

  wordsList: CardInfo[] = [];

  constructor(app: App) {
    super('div', ['word-editor']);
    this.addWordCard = new BaseComponent('div', ['add-word-card']);
    this.addWordCard.element.innerHTML = `
      <p class="add-word-card__title">Add new Word</p>
      <div class="add-word-card__plus-icon"></div>
    `;

    this.element.addEventListener('click', async(e) => {
      await this.eventHandler(e, app);
    });

    this.addWordCard.element.addEventListener('click', async () => {
      await this.addWord();
    });

    this.element.addEventListener('scroll', (e) => {
      if (this.element.scrollTop + this.element.clientHeight >= this.element.scrollHeight) {
        this.increaseWords(4);
      }
    })
  }

  async render(id: number) {
    clear(this.element);
    const category = await getCategory(id);
    this.currentCategory = category;
    this.wordsList = category.cards;
    this.element.append(this.addWordCard.element);
    this.increaseWords(4);
  }

  increaseWords(num: number) {
    for (let i = 0; i < num; i++) {
      const word = this.wordsList.shift();
      if (word) {
        const card = new WordCard(word);
        const addCard = document.querySelector('.add-word-card');
        (addCard as HTMLElement).before(card.element);
      } else break;
    }
  }

  updateWordCard(card: CardInfo, prevWord: string) {
    const wordCard = document.getElementById(`word-card-${prevWord}`);
    const audio = wordCard?.querySelector(`.${CLASS_NAMES.audio}`);
    const image = wordCard?.querySelector(`.${CLASS_NAMES.image}`);
    const word = wordCard?.querySelector(`.${CLASS_NAMES.word}`);
    const translation = wordCard?.querySelector(`.${CLASS_NAMES.translation}`);
    console.log(wordCard, audio, image);
    (audio as HTMLElement).dataset.src = card.audioSrc;
    (image as HTMLElement).style.backgroundImage = `url('${card.image}')`;
    (word as HTMLElement).innerHTML = card.word;
    (translation as HTMLElement).innerHTML = card.translation;
  }

  async addWord() {
    if (this.currentCategory) {
      const num = document.querySelectorAll(`.${CLASS_NAMES.wordCard}`).length;
      const word = getNewWord(this.currentCategory, num)
      const newCard = await createCard(word);
      const wordCard = new WordCard(newCard);
      const addCard = document.querySelector('.add-word-card');
      (addCard as HTMLElement).before(wordCard.element);
    }
  }

  async deleteWord(category: CategoryInfo, word: string) {
    await deleteCard(category.id, word);
    const wordCard = document.getElementById(`${CLASS_NAMES.wordCard}-${word}`);
    wordCard?.remove();
  }

  async getUpdatedCardInfo(word: string): Promise<CardInfo | undefined> {
    const wordInput = document.getElementById(`card-word-input-${word}`);
    const translationInput = document.getElementById(`card-translation-input-${word}`);

    const imageInput = document.getElementById(`image-input-${word}`);
    const imageForm = new FormData();
    const imageData = (imageInput as HTMLFormElement).files[0];
    let imageSrc;
    if (imageData) {
      imageForm.append('image', imageData);
      const imageResponse = await uploadImage(imageForm);
      imageSrc = imageResponse.secure_url;
    }

    const audioInput = document.getElementById(`audio-input-${word}`);
    const audioForm = new FormData();
    const audioData = (audioInput as HTMLFormElement)?.files[0];
    let audioSrc;
    if (audioData) {
      audioForm.append('audio', audioData)
      const audioResponse = await uploadAudio(audioForm);
      audioSrc = audioResponse.secure_url;
    }

    if (this.currentCategory !== null) {
      const newWord = getNewWord(this.currentCategory, 1);
      console.log(newWord)
      if (audioSrc) newWord.audioSrc = audioSrc;
      if (imageSrc) newWord.image = imageSrc;
      if (wordInput) newWord.word = (wordInput as HTMLInputElement).value;
      if (translationInput) newWord.translation = (translationInput as HTMLInputElement).value;
      return newWord;
    }

    return undefined;
  }

  async eventHandler(e: Event, app: App) {
    const target = e.target as HTMLElement;
    const word = target.dataset.word;
    if (word) {
      switch (target.className) {
        case CLASS_NAMES.saveBtn:
          const card = await this.getUpdatedCardInfo(word);
          if (card) {
            this.updateWordCard(card, word);
            await updateCard(card);
          }
          removeCardEditMode(word);
          return;
        case CLASS_NAMES.audio:
          if (target.dataset.src) playAudio(target.dataset.src);
          return;
        case CLASS_NAMES.changeBtn:
          setCardEditMode(word);
          return;
        case CLASS_NAMES.wordDeleteBtn:
          if (this.currentCategory) await this.deleteWord(this.currentCategory, word);
          return;
        case CLASS_NAMES.wordCancelBtn:
          removeCardEditMode(word);
          return;
        default:
          return;
      }
    }
  }
}
