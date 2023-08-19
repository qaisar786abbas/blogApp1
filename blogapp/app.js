
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc,  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyApZItU5vJjUd3N8bnD44ayL_dk5a6Zdy4",
    authDomain: "bloggingapp-9494e.firebaseapp.com",
    projectId: "bloggingapp-9494e",
    storageBucket: "bloggingapp-9494e.appspot.com",
    messagingSenderId: "199131367481",
    appId: "1:199131367481:web:202a8ce47b24cb3627e5e8",
    measurementId: "G-ENSCRDFC53"
};

initializeApp()
const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
const signupBtn = document.getElementById('signup-btn');

signupBtn && signupBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let firstName = document.getElementById("firstName")
    let lastName = document.getElementById("lastName")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then( async(userCredential) => {
            try {
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    password: password.value
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Signup successfully',
                })
                
            } catch (err) {
                console.log(err)
            } 
        })
        .catch((error) => {
            const errorMessage = error.message;

        });

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {

            const user = userCredential.user;

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;


        })
})

const getUserData = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let firstName = document.getElementById("firstName")
        let email = document.getElementById("email")
        console.log("Document data:", docSnap.data());
        firstName.value = docSnap.data().firstName;
        email.value = docSnap.data().email;
        
    } else {
        
        console.log("No such type of data");
    }
}