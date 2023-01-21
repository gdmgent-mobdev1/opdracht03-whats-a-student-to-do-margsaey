import { signInWithEmailAndPassword } from 'firebase/auth';
import Component from '../lib/Component';
// import Elements from '../lib/Elements';
import auth from '../lib/Auth';

export default class LoginComponent extends Component {
  constructor() {
    super({
      name: 'Login',
      model: {},
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
    </form>`;

    // appendChild(
    //   Elements.createHeader({
    //     textContent: 'Welcome to this page',
    //   }),
    // );
    const login = new LoginComponent();
    const appContainer = document.querySelector<HTMLDivElement>('#app')!;

    appContainer.appendChild(login.render());

    const initApp = () => {
      const $loginBtn = document.querySelector('#login');

      $loginBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const email: HTMLInputElement = document.querySelector('#email')!;
        const password: HTMLInputElement = document.querySelector('#password')!;

        const emailvalue = email.value;
        const passwordvalue = password.value;

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
