import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private userService: UserService) {
   }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.userService.login(this.form.value.username, this.form.value.password).subscribe((res) => {

        localStorage.setItem('token', res.token);
      });
    }
  }

}
