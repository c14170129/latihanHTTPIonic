import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  dataPOST = [];
  loading: any;

  constructor(private http: HttpClient, private loadCtrl : LoadingController, private toastCtrl: ToastController) {
  }

  public async loaderPresent(): Promise<any> {
    const load = await this.loadCtrl.create({
      message: "LOADING...",
      backdropDismiss: true
    });
    await load.present();
    return load;
  }

  async getDataPost() {
    this.loading = await this.loaderPresent();

      this.http.get("https://reqres.in/api/users").subscribe((res: any) => {
      this.dataPOST = res.data; // res is an object
      console.log(this.dataPOST)
      if(this.loading) {
        this.loading.dismiss();
      }
    })
  }

  // submit() {
    // "https://reqres.in/api/users"
  //   this.http.post("https://jsonplaceholder.typicode.com/posts", this.post).subscribe((res: any) => {
  //     console.log(res);
  //     this.toastCtrl.create({
  //       duration: 3000,
  //       message: "ID for new Item is "+res.id
  //     }).then(l => l.present())
  //   })
  // }

  ionViewDidEnter() {
    this.getDataPost();
  }

}
