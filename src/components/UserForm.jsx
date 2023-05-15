import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const UserForm = ({ switchBtn, getUsers, userSelected, userSelect }) => {

  const { handleSubmit, register, reset } = useForm();
  const [isVisible, setIsVisible] = useState(true);

  const defaultUser = {
    firts_name: '',
    last_name: '',
    email: '',
    password: '',
    birthday: ''
  };

  useEffect(() => {
    if (userSelected) {
      reset(userSelected);
    } else {
      reset(defaultUser);
    }
  }, [userSelected])

  const createUser = (data) => {
    if (userSelected) {
      axios.put(`https://users-crud.academlo.tech/users/${userSelected.id}/`, data)
        .then(() => {
          getUsers()
          userSelect(null);
        })
      switchBtn();
    } else {
      axios.post(`https://users-crud.academlo.tech/users/`, data)
        .then(() => getUsers())
      switchBtn();
    }
  };

  const showPassword = () => {
    setIsVisible(!isVisible);
  };

  return (
    <section className='form_container'>
      <form onSubmit={handleSubmit(createUser)}>
        <div className="title_form">
          <h3>Nuevo Usuario</h3>
          <i className="fa-solid fa-xmark" onClick={() => switchBtn()}></i>
        </div>
        <section className='input_cont'>
          <div className="input">
            <label htmlFor="firts_name">Nombre</label>
            <input type="text"
              id='firts_name'
              {...register("first_name")}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="last_name">Apellido</label>
            <input type="text"
              id='last_name'
              {...register("last_name")}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="email">Correo</label>
            <input type="text"
              id='email'
              {...register("email")}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="password">Contraseña</label>
            <div className="pass_cntrl">
              <i className="fa-solid fa-eye" onClick={() => showPassword()}></i>
              <input type={isVisible ? 'password' : 'text'}
                id='password'
                {...register("password")}
                required
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor="birthday">Cumpleaños</label>
            <input type="date"
              id='birthday'
              {...register("birthday")}
              required
            />
          </div>
          <button className='add_btn'>Agregar nuevo usuario</button>
        </section>
      </form>
    </section>
  );
};

export default UserForm;