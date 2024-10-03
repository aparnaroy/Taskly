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

export const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export const database = firebaseApp.database();

$("#loginButton").click(signIn);
$("#loginButton2").click(signIn);
function signIn() {
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;

            // Store user info in the database
            const userRef = database.ref('users/' + user.uid);
            userRef.set({
                displayName: user.displayName,
                email: user.email,
            })
            .then(() => {
                console.log('User data successfully written to the database.');
                window.location.href = "main-page.html"; // or wherever you want to redirect
            })
            .catch((error) => {
                console.log('Error writing user data:', error);
            });
        })
        .catch((error) => {
            console.log('Error during sign-in:', error);
        });
}


$(".logout-button").click(signOut);
function signOut() {
    auth.signOut()
      .then(() => {
          sessionStorage.removeItem('currentListId');
          window.location.href = "index.html";
      })
      .catch((error) => {
          console.error('Error during sign-out:', error);
      });
}