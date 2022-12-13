// import { useEffect, useState } from 'react';
import styles from './AuthorizationBlock.module.css';
import AuthorizationButton from './AuthorizationButton';

function AuthorizationBlock({
  blockAuthOpen,
  setBlockAuthOpen,
  setUsers,
  users,
  setUserActive,
}) {
  const userInUsers = (userName, userPass) => {
    users.forEach((user) => {
      user.name === userName && user.pass === userPass && (user.status = true);
    });
    console.log(users);
  };
  const onSubmitAuthorization = (e) => {
    e.preventDefault();
    let inpUser = document.querySelector('input[type=text]');
    let inpPass = document.querySelector('input[type=password]');
    userInUsers(inpUser.value, inpPass.value);
    users.forEach(
      (user) =>
        user.status === true && (setUserActive(user), setBlockAuthOpen(true))
    );
  };

  const addNewUser = () => {
    let inpUser = document.querySelector('input[type=text]');
    let inpPass = document.querySelector('input[type=password]');

    if (inpUser.value.length >= 4 && inpPass.value.length >= 4) {
      addUser(inpUser.value, inpPass.value);
      inpUser.value = '';
      inpPass.value = '';
    }
  };
  const addUser = (name, pass) => {
    let usersTestRepeat = users.filter(
      (user) => user.name === name && user.pass === pass
    );
    if (!usersTestRepeat.length)
      setUsers([...users, { name: name, pass: pass, status: false }]);
  };

  return (
    <>
      <AuthorizationButton
        click={() => {
          setBlockAuthOpen(false);
          users.forEach((user) => (user.status = false));
        }}
      />
      {!blockAuthOpen && (
        <div className={styles.AuthorizationBlock}>
          <form
            className={styles.AuthorizationForm}
            onSubmit={onSubmitAuthorization}
          >
            <button
              type="button"
              className={styles.btnClosed}
              onClick={() => setBlockAuthOpen(true)}
            >
              Closed
            </button>
            <div>
              <input
                className={styles.inputName}
                type="text"
                placeholder="Name"
                minLength="4"
                // value={userName}
                // onChange={(e) => setUserName(e.target.value)}
              />
              <input
                className={styles.inputPassword}
                type="password"
                placeholder="Pass"
                minLength="4"
                // value={userPass}
                // onChange={(e) => setUserPass(e.target.value)}
              />
            </div>
            <button type="submit">Auth</button>
            <button type="button" onClick={addNewUser}>
              Reg
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AuthorizationBlock;
