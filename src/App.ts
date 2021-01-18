import {CalculatorForm, Nodes} from './calculator/CalculatorForm';
import {Article, Content, ContentState} from "./Editor/Article";
import EditorialStaff from "./Editor/EditorialStaff";
import {Coop, Wolf, Lion, Animal} from "./test";

// import {headline, headline___main} from './styles/main.module.css';

function App() {
  // const headlineElem = document.querySelector('.headline');
  // headlineElem.classList.add(headline);
  // headlineElem.classList.add(headline___main);
  // const inputFirst = document.querySelector('.calculator__input-first') as HTMLInputElement;
  // const inputMode = document.querySelector('.calculator__input-mode') as HTMLSelectElement;
  // const inputSecond = document.querySelector('.calculator__input-second') as HTMLInputElement;
  // const output = document.querySelector('.calculator__output') as HTMLInputElement;
  // const buttonSubmit = document.querySelector('.calculator__button-submit') as HTMLButtonElement;
  //
  // let nodes: Nodes = {inputFirst, inputMode, inputSecond, output, buttonSubmit};
  // const calculatorForm = new CalculatorForm(nodes);
  // calculatorForm.handleButtonSubmit();
  //
  // //EditorialStaff app
  // const articleFirst: Content = new Article('Thomas Pyncon', 'Pilot',
  //   'His work has been carefully and judiciosly controled', ContentState.PUBLISHED);
  // const articleSecond: Content = new Article('Karel Capek', 'War',
  //   'A top models are notoriously insurence about their looks', ContentState.UNPUBLISHED);
  // const articleThird: Content = new Article('Francz Kafka', 'Metamorphosis',
  //   'Mr Harvey and his daughter have asked me to convey their very kinds requests', ContentState.UNPUBLISHED);
  // const articleFourth: Content = new Article('Francz Kafka', 'Test',
  //   'Mr Harvey and his daughter have asked me to convey their very kinds requests', ContentState.UNPUBLISHED);
  // const editorialStaff = new EditorialStaff();
  // editorialStaff.add(articleFirst);
  // editorialStaff.add(articleSecond);
  // editorialStaff.add(articleThird);
  // editorialStaff.add(articleFourth);
  // const articles: Array<Content> = editorialStaff.sortAlphabeticallyByHeadline();
  // console.log(articles);
  // let articleTest: Array<Content>;
  // let articlesKafka: Array<Content>;
  // try {
  //   articleTest = editorialStaff.filterByKeywords('and');
  //   articlesKafka = editorialStaff.filterByAuthorName('Francz Kafka');
  //   editorialStaff.publishContent('Francz Kafka', 'Test');
  //   editorialStaff.publishContent('Francz Kafka', 'Test');
  // } catch (e) {
  //   console.log(e);
  // }
  // console.log(articlesKafka);
  // console.log(articleTest);
  // editorialStaff.print();
  //
  // const coopWolf = new Coop<Wolf>();
  // const coopLion = new Coop<Lion>();
  // coopLion.addAnimal(new Lion('john', 50, /*'black')*/));
  // coopWolf.addAnimal(new Wolf('david', 30, /*10*/));
  // // coopWolf.addAnimal(new Lion('karel', 30));// ??????
  // let wolfDavid = coopWolf.getAnimalByName('david');
  // if (wolfDavid !== null) {
  //   wolfDavid.weight += 10;
  // }
  // //https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680
  // console.log(wolfDavid); //App.ts:57 Wolf {countClaws: 10, Symbol(): "david", Symbol(): 30}
  // console.log(coopLion);
  // console.log(coopWolf);
  //
  // //tuple - ntice
  // type Order = [number/*id*/, Date/*initial of order*/, string/*name of order*/];
  // let orderCloud:Order = [570, new Date(), 'cloud-service'];
  // let orderWeb:Order = [571, new Date(), 'web-service'];
  // const orders:Array<Order> = [];
  // orders.push(orderCloud);
  // orders.push(orderWeb);
  // console.log(orders);





}

export default App;

