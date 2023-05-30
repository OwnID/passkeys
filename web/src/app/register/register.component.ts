import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {fido2Create,PublicKeyCredential} from "@ownid/webauthn"

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
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

    register() {
        const username = this.username?.value;
        this.http.post('/register/start', {username}).subscribe(async (publicKey: PublicKeyCredential) => {
            const data = await fido2Create(publicKey, username);
            this.http.post<boolean>('/register/finish', data).subscribe((data: boolean) => {
                if (data) {
                    alert("Successfully created using webAuthn");
                }
            })
        });
    }
}
