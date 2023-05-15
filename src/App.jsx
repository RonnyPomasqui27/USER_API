import { useEffect, useState } from 'react'
import './App.css'
import UserForm from './components/UserForm';
import axios from 'axios';
import UsersList from './components/UsersList';

function App() {
  const [addUser, setAddUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [ userSelected, setUserSelected ] = useState(null);

  const switchBtn = () => {
    setAddUser(!addUser)
  };

  useEffect(() => {
    axios.get(`https://users-crud.academlo.tech/users/`)
      .then(res => setUsers(res.data))
  }, []);

  const getUsers = () => {
    axios.get(`https://users-crud.academlo.tech/users/`)
      .then(res => setUsers(res.data))
  };

  const deleteUser = (userCard) => {
    axios.delete(`https://users-crud.academlo.tech/users/${userCard.id}/`)
      .then(() => getUsers())
  };

  const userSelect = (userCard) => {
    setUserSelected(userCard);
  };

  return (
    <>
      <main className='App'>
        <section className='menu_cont'>
          <h2>Usuarios</h2>
          <button onClick={() => switchBtn()}><i className="fa-solid fa-plus"></i>Crear nuevo usuario</button>
        </section>
        {
          addUser ?
            <UserForm
              switchBtn={switchBtn}
              getUsers={getUsers}
              userSelected={userSelected}
              userSelect={userSelect}
            /> : ''
        }
        <UsersList
          users={users}
          deleteUser={deleteUser}
          switchBtn={switchBtn}
          userSelect={userSelect}
        />
      </main>
    </>
  )
}

export default App
