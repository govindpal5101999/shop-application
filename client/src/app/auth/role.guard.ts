import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  canActivate(): boolean {

    const role = localStorage.getItem('role');

    if (role === 'ADMIN') {
      return true;
    } else if (role == "CUSTOMER") {
      return true
    }

    return false;
  }
}