import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Profile } from '../_model/profile';
import { variables } from '../variables';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url = `${variables.HOST}/auth/profile`;
  http = inject(HttpClient);
  private profileCambio: Subject<Profile> = new Subject<Profile>();

  listar() {
    return this.http.get<Profile>(`${this.url}`);
  }

  getProfileCambio() {
    return this.profileCambio.asObservable();
  }

  setProfileCambio(profile: Profile) {
    this.profileCambio.next(profile);
  }
}
