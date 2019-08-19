/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthResult, NbAuthSocialLink, NB_AUTH_OPTIONS, getDeepFromObject } from '@nebular/auth';
import { IAuthTokenUser } from '../models/auth.model';
declare global {
  interface Window { Intercom: any; }
}
@Component({
  selector: 'nb-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomLoginComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe');
  }

  ngOnInit(): void {
    // window.Intercom('boot', {
    //   app_id: "j6xwfdq5",
    //   alignment: 'right',
    // });
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user)
      .subscribe((result: NbAuthResult) => {
        // console.log('TESTTESTTESTTESTTESTTEST')
        this.submitted = false;
        if (result.isSuccess()) {
          const user = result.getToken().getPayload() as IAuthTokenUser
          // const currentUser = {
          //   email: user.email,
          //   first_name: user.first_name,
          //   last_name: user.last_name,
          //   user_hash: user.user_hash,
          // }
          // window.Intercom('boot', { 
          //   app_id: 'j6xwfdq5',
          //   alignment: 'right',
          //   email: user.email,
          //   first_name: user.first_name,
          //   last_name: user.last_name,
          //   user_id: user.id,
          //   user_hash: user.user_hash,
          // });
          // localStorage.setItem('currentUser', JSON.stringify(currentUser)); //This is still needed to keep the hash updated on all pages
          this.messages = result.getMessages();
        } else {
          this.submitted = false;
          this.errors = result.getErrors();
        }
        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, this.redirectDelay);
        }
        this.cd.detectChanges();
      }, (error) => {
        // console.log('TESTTESTTESTTESTTESTTEST', error)
        this.submitted = false;
      })
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  clearSubmitted() {
    this.submitted = false
  }
}