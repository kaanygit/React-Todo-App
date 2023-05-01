import {useEffect, useState,useRef, Fragment} from 'react';
import { Outlet } from 'react-router-dom';
import {TbTrashX} from 'react-icons/tb';
import {FiEdit2} from 'react-icons/fi';
import {BiSave} from 'react-icons/bi';

import './todo.style.css';

const Todo=()=>{
    const [newTodo,setNewTodo]=useState('');
    const [items,setItems]=useState(()=>{
        const savedTodo=localStorage.getItem('todos');
        if(savedTodo){
        return JSON.parse(savedTodo);
        }else{
        return [];
        }
    });
    const [count,setCount]=useState(0);
    const [newEditTodo,setNewEditTodo]=useState('');
    const [openDarkMode,setOpenDarkMode]=useState("light");
    const sunLogo=useRef(null);
    const moonLogo=useRef(null);
    const labelElement=useRef(null);


    const handleDarkMode= ()=>{
        if(openDarkMode==="light"){
          setOpenDarkMode("dark")
        }else{
          setOpenDarkMode("light")
        }
        console.log(openDarkMode);
    }
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
      const deleteItem=(id)=>{
        const array=items.filter(item => item.id !== id);
        setItems(array);
    
      };


  // USEEFFECT 
  useEffect(()=>
    console.log(openDarkMode)
  ,[openDarkMode])
  useEffect(()=>{
    console.log(items)
  },[items])
  
  useEffect(()=>{
    if(labelElement.current?.classList.contains('checked') && items){
      switch(true){
        case labelElement.current.classList.contains('dark-mode'):
          labelElement.current.classList.add('dark-mode-line');
          break;
        default:
          labelElement.current.classList.remove('dark-mode-line');
          break;
      }
    }
  },[items])

  useEffect(()=>{
    const sunLogoElem=sunLogo.current;
    const moonLogoElem=moonLogo.current;

    if(sunLogoElem && moonLogoElem){
      if(openDarkMode==="dark"){
        sunLogoElem.classList.add('animate-sun');
        moonLogoElem.classList.add('animate-moon');
      }else{  
        sunLogoElem.classList.add('animate-sun');
        sunLogoElem.classList.remove('animate-sun');
        moonLogoElem.classList.remove('animate-moon');
      }
    }
    document.body.className=`${openDarkMode}-mode`;
  },[openDarkMode,sunLogo,moonLogo])

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(items))
  },[items])



    return(
      <Fragment>
          <div className="container">
              <div className='mode-toggle' onClick={handleDarkMode}>
                  <div className="sun sun-logo" ref={sunLogo}>
                  <svg viewBox="0 0 512 512" width="50" title="sun">
                  <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z" />
                  </svg>
                  </div>
                  <div className="moon moon-logo" ref={moonLogo}>
                  <svg viewBox="0 0 512 512" width="50" title="moon">
                  <path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z" />
                  </svg>
                  </div>
              </div>
              <div className='aasa'>
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
                                      <label htmlFor={`item-${item.id}`} className={`todos ${item.isCompleted ? "checked" : ""} ${openDarkMode}-mode`} ref={labelElement} >
                                          {item.value}
                                      </label>
                                      </span>
                                  ) : (
                                      <input
                                      type="text" className='edit-todo-item-input'
                                      placeholder="please enter your new task"
                                      value={newEditTodo}
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
          </div>
          <Outlet/>
        </Fragment>
    );
}
export default Todo