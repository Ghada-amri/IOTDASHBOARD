import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Temp_erature } from '../../../../../src/app/pages/dashboard/temperature/temperature.model';
@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(private firestore: AngularFirestore) { }
  
  getTemperature() {
    return this.firestore.collection('').snapshotChanges();
  }
  createTemperature(temperature: Temp_erature){
      return this.firestore.collection('temperature').add(Temp_erature);
  }
  updateTemperature(temperature: Temp_erature){
    delete temperature.id;
    this.firestore.doc('temperature/' + temperature.id).update(temperature);
  }
  deleteTemperature (temperatureId: string){
    this.firestore.doc('temperature/' + temperatureId).delete();
  }
}
