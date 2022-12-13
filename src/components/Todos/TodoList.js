import Todo from './Todo';
import styles from './TodoList.module.css';
function TodoList({
  todos,
  deleteTodo,
  setTodos,
  setTodosDeleted,
  todosDeleted,
  userActive,
  setBlockAuthOpen
}) {
  return (
    <div className={styles.todoListContainer}>
      <button
        className={styles.btnClearList}
        onClick={() => {
          if (userActive) {
            setTodosDeleted([...todosDeleted, ...todos]);
            setTodos([]);
          } else {
            setBlockAuthOpen(false)
          }
        }}
      >
        Clear list
      </button>
      {!todos.length && <h2>Todo list is empty</h2>}

      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} index={index} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
}

export default TodoList;
