import styles from './BasketBlock.module.css';
function BasketTodo({ todo, index, returnTodo, deleteTodoBasket }) {
  return (
    <div
      className={styles.basketTodo}
      onClick={() => {
        returnTodo(todo);
        deleteTodoBasket(index);
      }}
    >
      {todo}
    </div>
  );
}

export default BasketTodo;
