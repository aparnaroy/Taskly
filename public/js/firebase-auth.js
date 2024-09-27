const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

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