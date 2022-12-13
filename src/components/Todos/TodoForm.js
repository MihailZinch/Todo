import { useState } from 'react';
import styles from './TodoForm.module.css';
function TodoForm({ addTodo, userActive, setBlockAuthOpen }) {
  const [text, setText] = useState('');
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (userActive) {
      if (text.length >= 2) {
        addTodo(text);
        setText('');
      }
    } else {
      setBlockAuthOpen(false);
    }
  };
  return (
    <div className={styles.todoClass}>
      <form onSubmit={onSubmitHandler}>
        <input
          placeholder="Enter new todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          minLength="2"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TodoForm;
