const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAIoPl6VrHsALdG2okLUmNmA81CQj2V6EQ",
    authDomain: "fir-frontend-11107.firebaseapp.com",
    projectId: "fir-frontend-11107",
    storageBucket: "fir-frontend-11107.appspot.com",
    messagingSenderId: "279160001925",
    appId: "1:279160001925:web:84756b769828c9db41e0ec",
    measurementId: "G-SCNBQXS62N"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const register = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    auth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
        console.log(res.user);
    })
    .catch((err) => {
        alert(err.message)
        console.log(err.code);
        console.log(err.message);
    })
}

const login = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    auth.signInWithEmailAndPassword(email, password)
    .then((res) => {
        console.log(res.user);
    })
    .catch((err) => {
        alert(err.message)
        console.log(err.code);
        console.log(err.message);
    })
}

const saveData = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    db.collection('users')
    .add({
        email: email,
        password: password
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    
}

const readData = () => {
    db.collection('users')
    .get()
    .then((data) => {
        console.log(data.docs.map((item) => {
            return {...item.data(), id:item.id}
        }));
    })
}

const updateData = () => {
    db.collection('users').doc(
        'b1qn24EQoKcRumxT3h4m')
    .update({
        email: 'dorothy@email.com',
        password: '7890'
    })
    .then(() => {
        alert('Data updated!')
    })
}

const deleteData = () => {
    db.collection('users').doc('b1qn24EQoKcRumxT3h4m').delete()
    .then(() => {
        alert('Data deleted!')
    })
}