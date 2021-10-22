export class Brand {
  id: number;
  name: string;
  models: string[];


  constructor(id: number, name: string, models: string[]) {
    this.id = id;
    this.name = name;
    this.models = models;
  }

  public constructorVacio() {
    this.id = 0;
    this.name = "";
    this.models = [];
  }

  public showName(): string {
    return this.name;
  }

  public getId(): number {
    return this.id;
  }

}
