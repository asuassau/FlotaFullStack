import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,

})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    let user: User = {
    
      username: form.value.user,
      password: form.value.password,
    
    };
    this.authService.login(user).subscribe({
      next: (res) => {
        if (!res.access_token) {
          this.presentAlert();
          return;
        }
        this.router.navigateByUrl('/home');
        form.reset();
      },
      error: err => {
        this.presentAlert();
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'No se ha realizado el login correctamente',
      //subHeader: message,
      message: 'Revise los datos introducidos',
      buttons: ['OK']
    });

    await alert.present();
  }

}
