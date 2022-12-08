import { useState } from 'react';
import styles from './AuthorizationBlock.module.css';
function AuthorizationBlock({ setShowAuthBlock, addUser, userInUsers, statusUser }) {
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');

  const onSubmitAuthorization = (e) => {
    e.preventDefault();
    // console.log(userName, userPass)
    userInUsers(userName, userPass);
    // console.log(statusUser)
    if (statusUser) {
      setShowAuthBlock(false);
      setUserName('');
      setUserPass('');
    }
  };

  const addNewUser = () => {
    if (userName && userPass) addUser(userName, userPass);
  }

  return (
    
    <div className={styles.AuthorizationBlock}>
      <form
        className={styles.AuthorizationForm}
        onSubmit={onSubmitAuthorization}
      >
        <div>
          <input
            className={styles.inputName}
            type="text"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className={styles.inputPassword}
            type="password"
            placeholder="Pass"
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
          />
        </div>
        <button type="submit">Auth</button>
        <button onClick={addNewUser}>Reg</button>
      </form>
    </div>
  );
}

export default AuthorizationBlock;
