import {Brand} from "./brand";

export class Model {
  id: number;
  name: string;
  brand: Brand;


  constructor(id: number, name: string, brand: Brand) {
    this.id = id;
    this.name = name;
    this.brand = brand;
  }

  public showName(): string {
    return this.name;
  }

  public showNameModel(): string {
    return this.name + ', ' + this.brand.showName();
  }

  public getBrand(): Brand {
    return this.brand;
  }

  public getId(): number | null {
    return this.id;
  }
}
