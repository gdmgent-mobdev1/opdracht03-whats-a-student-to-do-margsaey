import { 
  signInWithEmailAndPassword, 
  getAuth, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  addDoc,
} from 'firebase/firestore';

import Component from '../lib/Component';
import { fireStoreApp } from '../lib/firebase-init';
// import Elements from '../lib/Elements';

export default class LoginComponent extends Component {
  private email: string;

  private password: string;

  constructor(email: string, password: string) {
    super({
      name: 'Login',
      model: {},
    });

    this.email = email;
    this.password = password;
  }

  public register() {
    const auth = getAuth(fireStoreApp);
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then(() => {
        console.log('Successfully registered user!');
        // Add user data to Firestore
        const db = getFirestore(fireStoreApp);
        const usersCollection = collection(db, 'users');

        addDoc(usersCollection, {
          email: this.email,
          password: this.password,
        })
          .then(() => {
            console.log('Document successfully written to Firestore!');
          })
          .catch((error) => {
            console.log('Error writing document to Firestore: ', error);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  public login() {
    const auth = getAuth(fireStoreApp);
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then(() => {
        console.log('Successfully logged in!');
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const loginContainer = document.createElement('div');
    loginContainer.innerHTML = `
    <h1>Login</h1>
    <form method="POST" id="loginform">
    <label>E-mail</label></br>
    <input type="email" name="email" id="email"></br>
    <label>Wachtwoord</label></br>
    <input type="password" name="password" id="password"></br>
    <input type="button" value="Login" id=login>
    <input type="button" value="Login with google" id=loginGoogle>
    </form>`;

    // appendChild(
    //   Elements.createHeader({
    //     textContent: 'Welcome to this page',
    //   }),
    // );
    const login = new LoginComponent(this.email, this.password);
    const appContainer = document.querySelector<HTMLDivElement>('#app')!;

    appContainer.appendChild(login.render());

    const initApp = () => {
      console.log('initApp called');
      const $loginBtn = document.querySelector('#login');

      $loginBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const email: HTMLInputElement = document.querySelector('#email')!;
        const password: HTMLInputElement = document.querySelector('#password')!;

        const emailvalue = email.value;
        const passwordvalue = password.value;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, emailvalue, passwordvalue).then(() => {
          console.log('test');
        })
          .catch((err) => {
            console.log(err.message);
          });

        console.log(`${emailvalue} ${passwordvalue}`);
      });
    };

    initApp();
    return loginContainer;
  }
}

const googleAuthButton = document.getElementById('google-auth-button');
if (googleAuthButton) {
  const auth = getAuth(fireStoreApp);
  const googleProvider = new GoogleAuthProvider();

  googleAuthButton.addEventListener('click', () => {
    signInWithRedirect(auth, googleProvider);
  });

  // Check for the redirect result when the page loads
  getRedirectResult(auth)
    .then((result) => {
      if (result?.user) {
        console.log('User successfully signed in with Google:', result.user.displayName);
        // You can handle the signed-in user here
      }
    })
    .catch((error) => {
      console.error('Error during Google sign-in redirect:', error.message);
    });
}
