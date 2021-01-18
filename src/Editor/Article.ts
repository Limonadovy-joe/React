enum ContentState {
  UNPUBLISHED = 0,
  PUBLISHED = 1,

};

interface Content {
  headline: string;
  author: string;
  text: string;
  state: ContentState;
}

class Article implements Content {
  readonly headline: string;
  readonly author: string;
  readonly text: string;
  state: ContentState;

  constructor(author: string, headline: string, text: string, state: ContentState) {
    this.author = author;
    this.headline = headline;
    this.text = text;
    this.state = state;
  }

  toString() {
    return `Author: ${this.author}, headline: ${this.headline},
     text: ${this.text}, state: ${((this.state === ContentState.PUBLISHED) ? 'published' : 'not-published')}`;
  }
}

export {Article, ContentState, Content};
