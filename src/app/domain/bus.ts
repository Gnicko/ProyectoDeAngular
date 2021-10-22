import {Model} from "./model";

export class Bus {
  id: number;
  licensePlate: string;
  model: Model;
  numberOfSeats: number;


  constructor(id: number, licensePlate: string, model: Model, numberOfSeats: number) {
    this.id = id;
    this.licensePlate = licensePlate;
    this.model = model;
    this.numberOfSeats = numberOfSeats;
  }

  public getId(): number {
    return this.id;
  }

  public getLicensePlate(): string {
    return this.licensePlate;
  }


  public showModel(): string {
    return (this.model.showNameModel());
  }

  public getModel(): Model {
    return this.model;
  }

  public getNumberOfSeats(): number {
    return this.numberOfSeats
  }
}
