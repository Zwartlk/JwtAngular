import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  currentUser: any; 

  constructor(private http: Http, public jwtHelper: JwtHelperService) {
    let token = localStorage.getItem('token');
    if (token) {
      this.currentUser = jwtHelper.decodeToken(token);
    }
  }

  login(credentials) { 
   return this.http.post('/api/authenticate', JSON.stringify(credentials)).pipe(
    map(response => {
      let result = response.json();
      
      if (result && result.token) {
        localStorage.setItem('token', result.token);

        this.currentUser = this.jwtHelper.decodeToken(localStorage.getItem('token'));

        return true; 
      }
      else return false; 
    }));
  }

  logout() { 
    console.log("aaa");
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn() { 
    let token = localStorage.getItem('token');
    return this.jwtHelper.isTokenExpired(token);
  }
}

