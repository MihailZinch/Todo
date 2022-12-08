import { useEffect, useState } from 'react';
import TodoForm from './Todos/TodoForm';
import TodoList from './Todos/TodoList';
import BasketBlock from './Basket/BasketBlock';
import AuthorizationButton from './Authorization/AuthorizationButton';
import AuthorizationBlock from './Authorization/AuthorizationBlock';
import styles from './Container.module.css';

function Container() {
  const [todos, setTodos] = useState([]);
  //  масив для Корзины
  const [todosDeleted, setTodosDeleted] = useState([]);

  const addTodoHandler = (text) => {
    setTodos([...todos, text]);
  };
  const deleteTodoHandler = (index) => {
    // добавить в Корзину
    if (statusUser) {
      todos.forEach(
        (todo, idx) => idx === index && setTodosDeleted([...todosDeleted, todo])
      );
      setTodos(todos.filter((_, idx) => idx !== index));
    }
  };
  // очистить Корзину полностью
  const clearTodosDeleted = () => {
    setTodosDeleted([]);
  };
  // удалить из Корзины одну
  const deleteTodoBasket = (index) => {
    setTodosDeleted(todosDeleted.filter((_, idx) => idx !== index));
  };

  // блок для localStorage--------------
  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('Todoshki')));
    setTodosDeleted(JSON.parse(localStorage.getItem('BasketTodoshki')));
  }, []);

  useEffect(() => {
    localStorage.setItem('Todoshki', JSON.stringify(todos));
    localStorage.setItem('BasketTodoshki', JSON.stringify(todosDeleted));
  }, [todos, todosDeleted]);
  //------------------------------------
  // block Authorization User ----------
  const [showAuthBlock, setShowAuthBlock] = useState(false);

  const [users, setUsers] = useState([]);
  const addUser = (name, pass) => {
    setUsers([...users, { name: name, pass: pass }]);
  };
  // useEffect(() => {
  //   console.log(users);
  // }, [users]);

  const [statusUser, setStatusUser] = useState(false);

  const userInUsers = (userName, userPass) => {
    users.forEach((user) => {
      if (user.name === userName && user.pass === userPass) {
        setStatusUser(true);
      }
    });
  };
  // -----------------------------------
  return (
    <div className={styles.Container}>
      <AuthorizationButton
        click={() => {
          setShowAuthBlock(true);
          setStatusUser(false);
        }}
      />
      {showAuthBlock && (
        <AuthorizationBlock
          setShowAuthBlock={setShowAuthBlock}
          addUser={addUser}
          userInUsers={userInUsers}
          statusUser={statusUser}
        />
      )}
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodoHandler} statusUser={statusUser} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodoHandler}
        statusUser={statusUser}
      />
      {!!todosDeleted.length && statusUser && (
        <BasketBlock
          todosDeleted={todosDeleted}
          clearTodosDeleted={clearTodosDeleted}
          returnTodo={addTodoHandler}
          deleteTodoBasket={deleteTodoBasket}
          statusUser={statusUser}
        />
      )}
    </div>
  );
}

export default Container;
