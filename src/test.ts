const _name = Symbol();
const _weight = Symbol();

abstract class Animal {
  [_name]: string;
  [_weight]: number;


  get name(): string {
    return this[_name];
  }

  set name(name: string) {
    this[_name] = name;
  }

  get weight(): number {
    return this[_weight];
  };

  set weight(weight: number) {
    this[_weight] = weight;
  }

  constructor(name: string, weight: number) {
    this[_name] = name;
    this[_weight] = weight;
  }
}


class Lion extends Animal {
  /*colorHair: string;*/

  constructor(name: string, weight: number,/* colorHair: string*/) {
    super(name, weight);
    /*this.colorHair = colorHair;*/
  }
}

class Wolf extends Animal {
  /*countClaws: number;*/

  constructor(name: string, weight: number,/* countClaws: number*/) {
    super(name, weight);
    /*this.countClaws = countClaws;*/
  }
}


const animals = Symbol();

class Coop<T extends Animal> {
  [animals]: T[] = [];

  addAnimal(animal: T): void {
    this[animals].push(animal);
  }

  getAnimalByName(searchedName: string): T | null {
    searchedName = searchedName.toLowerCase();
    const results: T[] = this[animals].filter((animal: T/*{name}*/) => animal.name.toLowerCase() === searchedName);
    return (!results.length) ? null : results[0];
  }
}
export {Animal, Coop, Lion, Wolf};


