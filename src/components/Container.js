import { useEffect, useState } from 'react';
import TodoForm from './Todos/TodoForm';
import TodoList from './Todos/TodoList';
import BasketBlock from './Basket/BasketBlock';
import AuthorizationBlock from './Authorization/AuthorizationBlock';
import styles from './Container.module.css';

function Container() {
  const [todos, setTodos] = useState([]);
  //  масив для Корзины
  const [todosDeleted, setTodosDeleted] = useState([]);
  // -------------------------------------------------
  const [users, setUsers] = useState([]);
  const [blockAuthOpen, setBlockAuthOpen] = useState(true);
  const [userActive, setUserActive] = useState(null);

  const addTodoHandler = (text) => {
    setTodos([...todos, text]);
  };
  const deleteTodoHandler = (index) => {
    // добавить в Корзину
    if (userActive) {
      todos.forEach(
        (todo, idx) => idx === index && setTodosDeleted([...todosDeleted, todo])
      );
      setTodos(todos.filter((_, idx) => idx !== index));
    } else {
      setBlockAuthOpen(false);
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
  }, [todos]);
  useEffect(() => {
    localStorage.setItem('BasketTodoshki', JSON.stringify(todosDeleted));
  }, [todosDeleted]);
  //------------------------------------
  // block Authorization User ----------

  // -----------------------------------
  return (
    <div className={styles.Container}>
      <AuthorizationBlock
        users={users}
        setUsers={setUsers}
        blockAuthOpen={blockAuthOpen}
        setBlockAuthOpen={setBlockAuthOpen}
        userActive={userActive}
        setUserActive={setUserActive}
      />

      <h1>Todo App</h1>
      <TodoForm
        addTodo={addTodoHandler}
        userActive={userActive}
        setBlockAuthOpen={setBlockAuthOpen}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        deleteTodo={deleteTodoHandler}
        setTodosDeleted={setTodosDeleted}
        todosDeleted={todosDeleted}
        userActive={userActive}
        setBlockAuthOpen={setBlockAuthOpen}
      />
      {!!todosDeleted.length && userActive && (
        <BasketBlock
          todosDeleted={todosDeleted}
          clearTodosDeleted={clearTodosDeleted}
          returnTodo={addTodoHandler}
          deleteTodoBasket={deleteTodoBasket}
        />
      )}
    </div>
  );
}

export default Container;
