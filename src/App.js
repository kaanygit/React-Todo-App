import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [newTodo,setNewTodo]=useState('');
  const [items,setItems]=useState([]);
  const [count,setCount]=useState(0);
  const [newEditTodo,setNewEditTodo]=useState('');

  const addItem=()=>{
    if(newTodo){
      alert('please enter todo');
      return;
    }
    const item={
      // id:Math.floor(Math.random()*1000),
      id:count,
      value:newEditTodo,
      isCompleted:false,
      isEdit:false,
    };
    setItems(oldItems=>[...oldItems,item]);
    setNewEditTodo(""); 
  };

  const deleteItem=(id)=>{
    const array=items.filter(item => item.id !== id);
    setItems(array);
  };
  const completeTodo=(id)=>{
    const index=items.findIndex(item=>item.id===id);
    if(index===-1) return;
    setItems(oldItems=>[
      ...oldItems.slice(0,index),
      {...oldItems[index],
      isCompleted:!oldItems[index].isCompleted
      },
      ...oldItems.slice(index+1),
    ]);
  };

  const editTodo=(id,oldTodo)=>{
    const index=items.findIndex(item=>item.id===id);
    if(index===-1) return;
    setItems(oldItems=>[
      ...oldItems.slice(0,index),
      {...oldItems[index],
      isEdit:!oldItems[index].isEdit
      },
      ...oldItems.slice(index+1),
    ]);
    setNewEditTodo(oldTodo);
  };

  const saveTodo=(id)=>{
    setItems(oldItems=>oldItems.map(item=>item.id===id ? {...item,isEdit : !item.isEdit,value:newEditTodo}:item));
    setNewEditTodo('');
  };


  useEffect(()=>
    console.log(items)
  ,[items])
  return (
    <div className="App">
        <h1>Todo App</h1>
        <input type='text' placeholder='please enter your new task' value={newEditTodo} onChange={e=>setNewEditTodo(e.target.value)} onClick={()=>setCount(count+1)}/>
        <button onClick={()=>addItem()}>Add</button>
        <ul>
          {items.map(item=>{
            return (
              <div key={item.id}> 
                <input type='checkbox' value={item.isCompleted} checked={item.isCompleted} onChange={()=>completeTodo(item.id)}/>

                {!item.isEdit ? (
                  <label className={`todos ${item.isCompleted ? "checked" : ""}`}>
                    {item.value}
                  </label>
                ) : (
                  <input
                    type="text"
                    placeholder="please enter your new task"
                    value={newEditTodo} // burada newTodo yerine newEditTodo kullanın
                    onChange={(e) => setNewEditTodo(e.target.value)}
                  />
                )}
                <button onClick={()=>deleteItem(item.id)}>X</button>
                {
                  item.isEdit ? 
                  <button className='todos save' onClick={()=>saveTodo(item.id)}>save</button>
                  :
                  <button className={`todos ${item.isEdit ? 'edit':''}`} value={item.isEdit} onClick={()=>editTodo(item.id,item.value)}>kalem</button> 
                }
              </div>
            )
          })}
        </ul>
    </div>
  );
}

export default App;