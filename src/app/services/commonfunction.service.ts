import { Injectable } from '@angular/core';
import { ToastController, AlertController } from "@ionic/angular";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonfunctionService {

  private userDisplayName = new Subject<any>();

  constructor(
    private toastCtrl: ToastController, 
    private alertCtrl: AlertController
    ) { }

  async presentToast(messageToShow,mesgPosition,showDuration){
    const toast = await this.toastCtrl.create({
      message: messageToShow,
      position: mesgPosition,
      duration: showDuration
    });
    toast.present();
  }

presentAlert(alrtHeader,alrtMessage) {
  let alert = this.alertCtrl.create({
    header: alrtHeader,
    subHeader: alrtMessage,
    buttons: ['Dismiss']
  }).then ((alert) =>{
   alert.present();
  });
 
}

validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

setDisplayName(displayName: string) {
  this.userDisplayName.next({ display_name: displayName });
}

getDisplayName(): Observable<any> {
  return this.userDisplayName.asObservable();
}

filterOrders() {
  // search by all row
  var input, filter, found, table, tr, td, i, j;
  input = document.getElementById("orderDataInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("ordersContainer");
  tr = table.getElementsByTagName("ion-col");
  for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("ion-row");
      for (j = 0; j < td.length; j++) {
          if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
              found = true;
          }
      }
      if (found) {
          tr[i].style.display = "";
          found = false;
      } else {
          tr[i].style.display = "none";
      }
  }

}

}
