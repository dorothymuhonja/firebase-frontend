import './App.css';
import { useEffect,useState } from 'react';
import { app, database } from './firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

function App() {
  const[array, setArray] = useState([]);
  const [data, setData] = useState({
    email: '',
    name: '',
    password: ''
  })

  const auth = getAuth();
  const dbInstance = collection(database, 'users')

  const handleInputs = (event) => {
    let inputs = {[event.target.name] : event.target.value}
    setData({...data, ...inputs})

  }

  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((response) => {
      console.log(response.user);
    })
    .catch((err) => {
      alert(err.message)
    })
    

  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((response) => {
      console.log(response.user);
    })
    .catch((err) => {
      alert(err.message)
    })
    

  }

  const handleAddData = () => {
    addDoc(dbInstance, data)
    .then(() => {
      alert('Data Sent!')
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  const getData = async () => {
    const data = await getDocs(dbInstance);
    setArray(data.docs.map((item)=> {
      return { ...item.data(), id: item.id}
    }));

  }

  const updateData = (id) => {
    let dataToUpdate = doc(database, 'users', id)
    updateDoc(dataToUpdate, {
      name: 'Muhonja',
      email: 'muhonja@email.com'
    })
    .then(() => {
      alert('Data Updated!')
      getData()
    })
    .catch((err) => {
      alert(err);
    })

  }

  const deleteData = (id) => {
    let dataToDelete = doc(database, 'users', id)
    deleteDoc(dataToDelete)
    .then(() => {
      alert('Data Deleted!')
      getData()
    })
    .catch((err) => {
      alert(err);
    })
  }

  useEffect(() => {
    getData()

  }, [])

  return (
    <div className="App-header">
      <input 
        placeholder="Email" 
        name="email" 
        type="email" 
        className="input-fields"
        onChange={event => handleInputs(event)}
        />

      <input 
        placeholder="Name" 
        name="name" 
        type="text" 
        className="input-fields"
        onChange={event => handleInputs(event)}
        />

      <input 
        placeholder="Password" 
        name="password" 
        type="password" 
        className="input-fields"
        onChange={event => handleInputs(event)}
        />
      <button onClick={handleSubmit}>Sign Up</button>
      <br/>
      <button onClick={handleSignIn}>Sign In</button>
      <br/>
      <button onClick={handleAddData}>Add Data</button>
      <br/>
      <button onClick={getData}>Get Data</button>
      <br/>
      {array.map((item) => {
        return(
          <div>
            <p>{item.email}</p>
            <p>{item.name}</p>
            <p>{item.password}</p>
            <button onClick={() => updateData(item.id)}>Update Data</button>
            <button onClick={() => deleteData(item.id)}>Delete Data</button>
            <hr/>
          </div>
        )
      })}
    </div>
  );
}

export default App;
