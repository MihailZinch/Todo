import styles from './AuthorizationButton.module.css';
function AuthorizationButton({click}) {
  return (
    <div className={styles.AuthorizationButton}>
      <button onClick={click}>Authorization</button>
    </div>
  );
}

export default AuthorizationButton;

// Добавляем в приложение ещё один компонент, регистрация/авторизация пользователя. При загрузке приложения сбоку ты видишь кнопку регистрации по нажатию на которую появится окно регистрации. Зарегистрированный пользователь может добавлять/удалять/обновлять таски. Незарегистрированый только наблюдать список уже имеющихся задач. Если он захочет добавить/удалить/обновить задачу, сразу по клику выскочит форма регистрации/авторизации
