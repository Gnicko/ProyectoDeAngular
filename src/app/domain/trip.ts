import {Bus} from "./bus";
import {Person} from "./person";

export class Trip {
  id: number;
  departure: string;
  destination: string;
  bus: Bus;
  passengers: Person[];
  startDate: number;
  endDate: number;


  constructor(id: number, departure: string, destination: string, bus: Bus, passengers: Person[], startDate: number, endDate: number) {
    this.id = id;
    this.departure = departure;
    this.destination = destination;
    this.bus = bus;
    this.passengers = passengers;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  public showName(): string {
    return this.departure;
  }

  public showBus(): string {
    return this.bus.getLicensePlate();
  }

  public showPassengers(): string {
    let cadena = "";
    this.passengers.forEach(p => cadena = cadena + p.showName() + "; " + "\n");
    return cadena;
  }

  //valida si la cantidad de pasajeros del viaje es menor a la cantidad de asientos del colectivo asignado
  //si es menor retorna true
  //si es mayor retorna false
  public validarCantidadPasajeros(): boolean {
    let e = false;
    if (this.passengers.length < this.bus.numberOfSeats) {
      e = true;
    }
    return e;
  }
  public validateFreeSpace(): number {
    return this.bus.numberOfSeats - this.passengers.length; //resultado: cantidad de lugares restantes en el colectivo
  }
}
