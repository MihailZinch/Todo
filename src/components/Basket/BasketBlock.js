import { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { BiTrashAlt } from 'react-icons/bi';
import BasketTodo from './BasketTodo.js';
import styles from './BasketBlock.module.css';
function BasketBlock({
  todosDeleted,
  clearTodosDeleted,
  returnTodo,
  deleteTodoBasket,
}) {
  const [statusBasket, setStatusBasket] = useState(false);
  // показать/скрыть список Корзины
  function showTodosDeleted() {
    if (!statusBasket) {
      setStatusBasket(true);
    } else {
      setStatusBasket(false);
    }
  }
  return (
    <div className={styles.basketBlock}>
      <BiTrash className={styles.basketIcon} onClick={showTodosDeleted} />
      {statusBasket && (
        <BiTrashAlt
          className={styles.clearBasketIcon}
          onClick={clearTodosDeleted}
        />
      )}
      {statusBasket && (
        <div>
          {todosDeleted.map((todo, index) => (
            <BasketTodo
              className={styles.basketTodo}
              key={index}
              index={index}
              todo={todo}
              returnTodo={returnTodo}
              deleteTodoBasket={deleteTodoBasket}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BasketBlock;
