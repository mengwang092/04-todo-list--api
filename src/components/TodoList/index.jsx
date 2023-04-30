import { useState, useCallback, useMemo, useEffect } from 'react';

import RenderTip from '../RenderTip';
import TodoForm from '../TodoForm';
import TodoItem from '../TodoItem';
import TodoFilter from '../TodoFilter';
import { fetchTodo, addTodo, toggleTodo, deleteTodo } from '../../services/api';

type TodoType = {
  id: string,
  text: string,
  done: boolean,
};

const TodoList = () => {
  // TODO2
  /**
   * @type {[TodoType[], Function]}
   */
  const [list, setList] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(false);

  // TODO3
  useEffect(() => {
    setLoading(true);
    fetchTodo()
      .then((data) => setList(data))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // TODO4
  const atAddItem = useCallback((text: string) => {
    setLoading(true);
    addTodo(text)
      .then(setList)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // TODO5
  const atToggleItem = useCallback((id: string) => {
    setLoading(true);
    toggleTodo(id)
      .then(setList)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // TODO6
  const atDeleteItem = useCallback((id: string) => {
    setLoading(true);
    deleteTodo(id)
      .then(setList)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filtersList = useMemo(() => {
    return list.filter((todo: TodoType) => {
      if (filterType === 'completed') {
        return todo.done;
      }
      if (filterType === 'active') {
        return !todo.done;
      }
      return true;
    });
  }, [list, filterType]);

  return (
    <section className="todo-list" data-name="TodoList">
      {loading && <div className="my-spinner" />}
      <RenderTip />
      <TodoForm onAddItem={atAddItem} />
      <TodoFilter filterType={filterType} onFilterChange={setFilterType} />
      <div>
        {filtersList.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            done={item.done}
            text={item.text}
            onToggleItem={atToggleItem}
            onDeleteItem={atDeleteItem}
          />
        ))}
      </div>
    </section>
  );
};

export default TodoList;
