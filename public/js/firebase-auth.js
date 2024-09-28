const firebaseConfig = {
    apiKey: "AIzaSyC3rRVfezDS4XDhYDaz6gWFhW_rc9VtRNI",
    authDomain: "taskly-todoapp.firebaseapp.com",
    databaseURL: "https://taskly-todoapp-default-rtdb.firebaseio.com",
    projectId: "taskly-todoapp",
    storageBucket: "taskly-todoapp.appspot.com",
    messagingSenderId: "673767483459",
    appId: "1:673767483459:web:32cb19595f8cbb9cdc8cf6",
    measurementId: "G-8CES8VCF0C"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export const database = firebaseApp.database();

$("#loginButton").click(signIn);
$("#loginButton2").click(signIn);
function signIn() {
    auth.signInWithPopup(provider)
    .then((result) => {
        const user = result.user;
        // $('.username').text(`Welcome, ${user.displayName}`);
        // $('.user-circle').text(user.displayName.charAt(0));
        
        // Store user info in sessionStorage
        sessionStorage.setItem('username', user.displayName);
        sessionStorage.setItem('userInitial', user.displayName.charAt(0));
        sessionStorage.setItem('userEmail', user.email);

        window.location.href = "start-up.html";
        // window.location.href = "main-page.html";
    })
    .catch((error) => {
        console.error('Error during sign-in:', error);
    });
}

$(".logout-button").click(signOut);
function signOut() {
    auth.signOut()
      .then(() => {
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('userInitial');
          sessionStorage.removeItem('userEmail'); 

          window.location.href = "index.html";
          // console.log('User signed out.');
      })
      .catch((error) => {
          console.error('Error during sign-out:', error);
      });
}