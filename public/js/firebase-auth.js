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
                // Add any additional user info you want to store
                // TODO: add random user profile icon color
            });

            // Wait for authentication state to be updated
            auth.onAuthStateChanged((user) => {
                if (user) {
                    console.log('User UID:', user.uid);
                    window.location.href = "main-page.html"
                    // TODO: change to start-up
                }
            });
        })
        .catch((error) => {
            console.error('Error during sign-in:', error);
        });
}


$(".logout-button").click(signOut);
function signOut() {
    auth.signOut()
      .then(() => {
          window.location.href = "index.html";
          // console.log('User signed out.');
      })
      .catch((error) => {
          console.error('Error during sign-out:', error);
      });
}