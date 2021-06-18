import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth, USE_EMULATOR } from "@angular/fire/auth";
//import   auth  from 'firebase/';
//import * as firebase from "firebase";
import firebase from "firebase/app";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from 'rxjs';
import { switchMap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user1: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user1 = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        }
        return of(null)
      })
    );



  }
  /*metodo de cierre de sesion*/
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error', error)
    }
  }


  /*METODO DE INCIO DE SESION*/
  async login(email: string, password: string): Promise<User> {

    try {

      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;

    } catch (error) {
      console.log('Error==>', error)
    }

  }

  /*METODO DE REGISTRO DE USUARIO*/
  async registro(email: string, password: string): Promise<User> {
    try {

      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.emailverificacion();
      return user;

    } catch (error) {
      console.log('Erro==>', error)
    }
  }


  /*METODO DE EMAIL DE VERIFICACION*/
  async emailverificacion(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();

    } catch (error) {
      console.log('Error==>', error)

    }
  }

  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false
  }

  /*METODO LOGIN CON GOOGLE*/
  async logingoogle(): Promise<User> {

    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;

    } catch (error) {
      console.log('Erro en auth', error)

    }
  }

  /*METODO REINICIAR LA CONTRASE:A*/
  async restablecercontra(email: string): Promise<void> {

    try {
      return this.afAuth.sendPasswordResetEmail(email);

    } catch (error) {
      console.log('error', error)

    }
  }

  /*METODO PRIVADO */
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`user/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };
    return userRef.set(data, { merge: true });
  }

}
