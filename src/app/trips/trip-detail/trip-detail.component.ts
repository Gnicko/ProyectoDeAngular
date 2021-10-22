import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonService} from "../../person/person.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TripsService} from "../trips.service";
import {Trip} from "../../domain/trip";
import {Bus} from "../../domain/bus";
import {BusesService} from "../../buses/buses.service";
import {Person} from "../../domain/person";
import {Brand} from "../../domain/brand";
import {Model} from "../../domain/model";
import {BrandService} from "../../brands/brand.service";
import {ModelService} from "../../models/model.service";
import * as moment from "moment";
import {DateValidator} from "../../Validators/dateValidator";

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit {

  formTrip: FormGroup = this.fb.group({
    id: [, []],
    departure: ['', [Validators.required]],
    destination: ['', [Validators.required]],
    bus: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
  }, {
    validators: DateValidator.validateDate("startDate", "endDate")
  })

  buses: Bus[] = [];
  brands: Brand[] = [];
  models: Model[] = [];
  nameBuses: string = "";
  nameModel: string = "";
  nameBrand: string = "";
  brandSave: Brand = new Brand(0, "", []);
  modelSave: Model = new Model(0, "", this.brandSave);
  busSave: Bus = new Bus(0, "", this.modelSave, 0);
  loading: boolean = false;
  passgress: Person[] = [];

  constructor(public route: ActivatedRoute,
              public fb: FormBuilder, public router: Router,
              private tripService: TripsService,
              private busService: BusesService,
              private personService: PersonService,
              private brandService: BrandService,
              private modelService: ModelService,
              private snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.getAllBrands();

    this.findBuses();
    this.route.paramMap.subscribe(param => {
      this.loading = true;
      let paramId = param.get("id");
      if (paramId != null) {
        const id = parseInt(paramId);
        this.tripService.findOne(id).subscribe(trip => {
            this.buildForm(trip);
            this.loading = false;
          },
          error => {
            this.loading = false;
            this.snackBar.open(error, "Error", {duration: 2000});
            this.goToBack();
          })
      } else {
        this.buildForm(null);
        this.loading = false;
      }
    })
  }

  buildForm(trip: Trip | null) {
    if (trip != null) {
      this.nameModel = trip.bus.getModel().showName();
      this.nameBrand = trip.bus.getModel().getBrand().showName();
      this.nameBuses = trip.bus.getLicensePlate();
      this.passgress = trip.passengers
      this.formTrip.patchValue({
        id: trip.id,
        departure: trip.departure,
        destination: trip.destination,
        bus: trip.bus.getLicensePlate(),
        passengers: trip.showPassengers(),
        startDate: moment(trip.startDate * 1000).format("yyyy-MM-DDTHH:mm"),
        endDate: moment(trip.endDate * 1000).format("yyyy-MM-DDTHH:mm")
      })

    }
  }


  get fc() {
    return this.formTrip.controls;
  }

  goToBack() {
    this.router.navigate(['trips', 'list']);
  }

  save() {
    this.findBrand(this.formTrip.get(['brand'])?.value);
    this.findModel(this.formTrip.get(['model'])?.value);
    this.findBus(this.formTrip.controls.bus.value);
    const trip = new Trip(
      this.formTrip.get(["id"])?.value,
      this.formTrip.get(["departure"])?.value,
      this.formTrip.get(["destination"])?.value,
      this.busSave,
      this.passgress,
      //se divide por 1000 por los milisegundos y se resta 10800 porque son las 3 horas que suma el date de la zona horaria
      new Date(this.formTrip.get(["startDate"])?.value).getTime() / 1000 - 10800,
      new Date(this.formTrip.get(["endDate"])?.value).getTime() / 1000 - 10800)


    if (trip.id != null) {

      this.tripService.update(trip).subscribe(t => {
          this.snackBar.open("El viaje se actualizó con exito", "Éxito", {duration: 2000});
          this.goToBack();
        },
        error => {
          this.snackBar.open(error, "Error", {duration: 2000});
        }
      )
    } else {
      this.tripService.create(trip).subscribe(t => {
          this.snackBar.open("El viaje se creo con exito", "Éxito", {duration: 2000});
          this.goToBack();
        },
        error => {
          this.snackBar.open(error, "Error", {duration: 2000});
          console.log(error)
        }
      )
    }
  }


  findBrand(nameBrand: string) {
    this.brands.forEach(brand => {
      if (brand.showName() === nameBrand) {
        this.brandSave = brand;

      }
    })
  }

  findModel(name: string) {
    this.models.forEach(model => {
      if (model.name === name) {
        this.modelSave = model
      }
    })
  }

  findBuses() {
    return this.busService.findAll().subscribe(b => {
      this.buses = b;
      this.loading = false;
    });
  }

  findBus(licensePlate: string) {
    this.buses.forEach(bus => {
      if (bus.getLicensePlate() === licensePlate) {
        this.busSave = bus;
      }
    })
  }

  getAllBrands() {
    this.brandService.findAll().subscribe(list => {
      this.brands = list;
      this.loading = false;
    });
  }
}
