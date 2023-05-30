import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {fido2Get,PublicKeyCredential} from "@ownid/webauthn"

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    form: FormGroup;
    constructor(private router: Router, private http: HttpClient, formBuilder: FormBuilder,) {
        this.form = formBuilder.group(
            {
                username: ['', [Validators.required]],
            },
            {updateOn: 'blur'},
        );
    }

    get username(): AbstractControl | null {
        return this.form.get('username');
    }

    login() {
        const username = this.username?.value;
        this.http.post('/login/start', {username}).subscribe(async (publicKey: PublicKeyCredential) => {
            const data = await fido2Get(publicKey,username);
            this.http.post<boolean>('/login/finish', data).subscribe((data: any) => {
                if (data.res) {
                    alert("Successfully authenticated using webAuthn");
                }
            });
        });
    }
}
