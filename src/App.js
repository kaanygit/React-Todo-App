import './App.css';
import {useEffect, useState} from 'react';
import {TbTrashX} from 'react-icons/tb';
import {FiEdit2} from 'react-icons/fi';
import {BiSave} from 'react-icons/bi';

function App() {
  const [newTodo,setNewTodo]=useState('');
  const [items,setItems]=useState([]);
  const [count,setCount]=useState(0);
  const [newEditTodo,setNewEditTodo]=useState('');

  const addItem=()=>{
    if(!newEditTodo){
      alert('please enter todo');
      return;
    }
    const item={
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

  // kontrol amaclı item listesi
  useEffect(()=>
    console.log(items)
  ,[items])


  return (
    <div className="container">
        <div className='todo-name'>
          <div className='todo-name-row'>
            <h1  className='todo-app-name'>Todo App</h1>
          </div>
        </div>
        <div className='item-add'>
          <div className='item-add-row'>
            <input type='text' className='item-add-input' placeholder='please enter your new task' value={newEditTodo} onChange={e=>setNewEditTodo(e.target.value)}/>
            <button className='item-add-button' onClick={()=>{addItem();setCount(count+1);}}>Add</button>
          </div>
        </div>
        <div className='items'>
          <ul className='items-ul-tag'>
            {items.map(item=>{
              return (
                <li key={item.id} className='todo-item'> 
                  <input type='checkbox' className='todo-item-checkbox' id={`item-${item.id}`} value={item.isCompleted} checked={item.isCompleted} onChange={()=>completeTodo(item.id)}/>
                  {!item.isEdit ? (
                    <span className='label'>
                      <label htmlFor={`item-${item.id}`} className={`todos ${item.isCompleted ? "checked" : ""}`} >
                        {item.value}
                      </label>
                    </span>
                  ) : (
                    <input
                      type="text" className='edit-todo-item-input'
                      placeholder="please enter your new task"
                      value={newEditTodo} // burada newTodo yerine newEditTodo kullanın
                      onChange={(e) => setNewEditTodo(e.target.value)}
                    />
                  )}
                  {
                    item.isEdit ? 
                    <BiSave className='todos-save' onClick={()=>saveTodo(item.id)}/>
                    :
                    <FiEdit2 className={`todos-edit ${item.isEdit ? 'edit':''}`} value={item.isEdit} onClick={()=>editTodo(item.id,item.value)}/> 
                  }
                  <TbTrashX className={`trash-button${item.isEdit?'-edit':''}`} onClick={()=>deleteItem(item.id)}/>
                </li>
              )
            })}
          </ul>
        </div>
    </div>
  );
}

export default App;