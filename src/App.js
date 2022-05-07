import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import { useState, useRef, useMemo, useEffect, useCallback } from 'react';


function App() {
  const [todos, setTodos] = useState([
    {
        id: 1,
        text: '리액트의 기초 알아보기',
        checked: true,
    },
    {
        id: 2,
        text: '컴포넌트 스타일링해 보기',
        checked: true,
    },
    {
        id: 3,
        text: '일정 관리 앱 만들어 보기',
        checked: false,
    },
])

  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    // text => {
    //   todos.push({
    //     id: 123,
    //     text,
    //     checked: false
    //   })

    //   setTodos(todos)
    // },

    [todos],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  );

  // const onToggle = useCallback(
  //   id => {
  //     setTodos(
  //       todos.map(todo =>
  //         todo.id === id ? { ...todo, checked: !todo.checked } : todo,
  //       ),
  //     );
  //   },
  //   [todos],
  // );


  const ref = useRef()

  useEffect(() => {
    ref.current = 1
  }, [])

  const incr = () => {
    ref.current += 1
    return alert('현재 값은 ' +ref.current +'입니다')
  }

  const onToggleRef = useRef()

  useEffect(() => {
    onToggleRef.current = id => {
      setTodos(todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo))
    }
  }, [todos])

  const onToggleMemo = useMemo(() => {
    return id => {
      setTodos(todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo))
    }
  }, [todos])

  const onToggleCallback = useCallback(id => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo))
  }, [todos])

  const onToggle = id => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo))
  }

  return (
    <TodoTemplate>
      <button onClick={incr}>incr</button>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggleCallback} />
    </TodoTemplate>
  )
}

export default App;
