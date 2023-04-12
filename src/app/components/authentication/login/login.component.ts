import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  async submit() {
    if (this.form.valid) {
      this.userService.login(this.form.value.username, this.form.value.password).then((res) => {
        localStorage.setItem('token', res.token!);
        localStorage.setItem('userId', JSON.stringify(res.id));
        this.router.navigate(['/']);
      }).catch((err) => {
        console.error(err);
      });
    }
  }

}
