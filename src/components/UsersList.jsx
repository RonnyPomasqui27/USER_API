import React from 'react';

const UsersList = ({ users, deleteUser, switchBtn, userSelect }) => {

  const updateUser = (userCard) => {
    switchBtn();
    userSelect(userCard);
  };


  return (
    <section className='userList_cont'>
      {
        users.map((userCard) => (
          <div className="card_conta" key={userCard.id}>
            <h2>{userCard.first_name} {userCard.last_name}</h2>
            <div className="line"></div>
            <div className="info_cont">
              <label className='info_text'>Correo: </label>
              <p>{userCard.email}</p>
              <label className='info_text'>Cumpleaños: </label>
              <div className='birht'>
                <p><i className="fa-solid fa-gift"></i>{userCard.birthday}</p>
              </div>
            </div>
            <div className="line"></div>
            <div className="btn_actions">
              <button onClick={() => deleteUser(userCard)}><i className="fa-solid fa-trash"></i></button>
              <button onClick={() => updateUser(userCard)}><i className="fa-solid fa-pen"></i></button>
            </div>
          </div>
        ))
      }
    </section>
  );
};

export default UsersList;