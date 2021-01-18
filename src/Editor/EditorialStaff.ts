import {Content, ContentState} from "./Article";


interface ContentModifiable {
  add(content: Content): void;

  filterByKeywords(keyword: string): Array<Content>;

  filterByAuthorName(searchedAuthor: string): Array<Content>;

  publishContent(searchedAuthor: string, headline: string): void;

  // unPublishContent(searchedAuthor: string, headline: string): void;
};

interface ContentSortableAlphabetically {
  sortAlphabeticallyByHeadline(): Array<Content>;
};


class EditorialStaff implements ContentModifiable, ContentSortableAlphabetically {
  private _containerData: Array<Content> = new Array();

  constructor() {
  }

  //TODO - generics method isExist


  publishContent(searchedAuthor: string, searchedHeadline: string):void {
    searchedAuthor = searchedAuthor.toLowerCase();
    searchedHeadline = searchedHeadline.toLowerCase();
    const isAuthorExists = this._containerData
      .some(({author, headline:originalHeadline}) => author.toLowerCase() === searchedAuthor && searchedHeadline === originalHeadline.toLowerCase());
    if (!isAuthorExists) {
       throw new Error('Author or its article propably dont exist');
    }
    const articleState:ContentState = this._containerData
      .filter(({author}) => author.toLowerCase() === searchedAuthor)
      .filter(({headline}) => headline.toLowerCase() === searchedHeadline)[0].state;
    if (articleState === ContentState.PUBLISHED) {
      throw new Error(`author ${searchedAuthor } published required headline ${searchedHeadline}`);
    }
    const article:Content = this._containerData.filter(({author,headline: originalHeadline}) => author.toLowerCase() === searchedAuthor && searchedHeadline === originalHeadline.toLowerCase())[0];
    article.state = ContentState.PUBLISHED;
  }

  filterByAuthorName(searchedAuthor: string): Array<Content> {
    const isAuthorExists = this._containerData
      .some(({author: originalAuthor}) => searchedAuthor.toLowerCase() === originalAuthor.toLowerCase());
    if (!isAuthorExists) {
      console.log(`searchedAuthor: ${searchedAuthor} does not exist in database...`);
      throw new Error('Author does not exist.');
    }
    return this._containerData.filter(({author}) => author === searchedAuthor);
  }

  filterByKeywords(keyword: string): Array<Content> {
    const isKeywordExists = this._containerData.some(({text}) => text.includes(keyword));
    if (!isKeywordExists) {
      console.log(`Keyword: ${keyword} does not exist in database...`);
      throw new Error('Keyword does not exist.');
    }
    return this._containerData.filter(({text}) => text.includes(keyword));
  }

  sortAlphabeticallyByHeadline(): Array<Content> {
    this._containerData = this._containerData.sort((contentA, contentB) => {
      const headlineA: string = contentA.headline;
      const headlineB: string = contentB.headline;

      if (headlineA > headlineB) {
        return 1;
      } else if (headlineA < headlineB) {
        return -1;
      } else {
        return 0;
      }
    });
    return this._containerData;
  }


  add(content: Content): void {
    this._containerData.push(content);
    console.log(`Article ${content.headline} from ${content.author} has been added properly`);
  }

  print(): void {
    this._containerData.forEach(content => console.log(`${content}`));
  }


}

export default EditorialStaff;
