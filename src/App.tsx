

// import { useCallback, useReducer, useRef, useEffect, useState } from 'react';
// import { VoidExpression } from 'typescript';
// import './App.css';
// import Lists from './componentws/Lists';

// // const Box : React.FunctionComponent<{children:string}> =({children}) =>{
// //   return <div>{children}</div>
// // }

// function App() {

//   interface ToDo {
//     id: number,
//     text : string,
//   }

//   type ActionType = { type: 'ADD'; text: string} | { type: 'REMOVE'; id: number } |  { type: 'ONLOAD';}

//   function reducer( state: ToDo[], action: ActionType ){
//     switch(action.type){
//       case 'ADD':
//         let newData : ToDo[] = [...state,
//           {
//             id: state.length,
//             text: action.text,
//           }
//           ]
//           // localStorage.setItem('dataKey', JSON.stringify(data));
//           localStorage.setItem('todosData', JSON.stringify(newData));
//         return newData
        
//       case 'REMOVE':
//         let afterDeleteNewData : ToDo[] = state.filter( ({id}) => id !== action.id )
//         localStorage.setItem('todosData', JSON.stringify(afterDeleteNewData));
//         return afterDeleteNewData
//       case 'ONLOAD':
//         let loadData  = localStorage.getItem('todosData')
//         if(loadData){
//           let newLoadData : ToDo[] = JSON.parse(loadData)
//           return newLoadData
//         }
//         return []
//     }
//   }

//   const [todos, dispatch] = useReducer( reducer, [] )

//   const newTodoRef = useRef<HTMLInputElement>(null)


//   // usecall back
//   const onAddTodo = useCallback(()=>{
//     if(newTodoRef.current){
//       dispatch({
//         type:"ADD",
//         text: newTodoRef.current.value
//       })
//       // localStorage.setItem('todosData', JSON.stringify(state));
//       newTodoRef.current.value = ''
//     }
//   }, [])

//   const onRemove = (id:number) : void =>{
//     dispatch({
//       type:"REMOVE",
//       id: id
//     })
//   }

//   useEffect(()=>{
//     dispatch({
//       type: 'ONLOAD',
//     })
//   },[])



//   return (
//     <div className="App">
//      {/* <Lists /> */}
//       {/* <Box children={'hello'}></Box> */}
//       <input type={'text'} ref={newTodoRef} />
//       <button onClick={onAddTodo}>Add me</button>
//       { todos.map((todo)=>
//         <>
//           <div key={todo.id}>
//               {todo.text}
//               <button onClick={ () => onRemove(todo.id)}>Remove</button>
//           </div>
//         </>) 
//         }

//     </div>
//   );
// }

// export default App;

import { useCallback, useEffect, useReducer, useRef } from 'react'
import './App.css';

const App = () => {

  interface ToDo {
    id: number,
    text: string
  }

  const inputRef = useRef<HTMLInputElement>(null)

  type actionType = { type : "ADD", text:string } | { type : "REMOVE", id:number } | { type : "ONLOAD" }

  const reducer = ( state: ToDo[], action:actionType ):ToDo[] =>{
    switch(action.type){
      case "ADD":
        let addData : ToDo[] = [...state, {id:state.length, text:action.text}]
        localStorage.setItem('todosData', JSON.stringify(addData));
        return addData
      case "REMOVE":
        let afterDeleteNewData : ToDo[] = state.filter( ({id}) => id !== action.id)
        localStorage.setItem('todosData', JSON.stringify(afterDeleteNewData));
        return afterDeleteNewData
      case "ONLOAD":
        let data = localStorage.getItem('todosData')
        if(data){
          let loadData : ToDo[] = JSON.parse(data)
          return loadData
        }
        return []
    }

  }
  const [ todos, dispatch ] = useReducer( reducer, [] )

  const onAddTodo = useCallback(()=>{
    if( inputRef.current?.value ){
      dispatch({
        type:"ADD",
        text: inputRef.current.value
      })
      inputRef.current.value = ''
    }

  },[])

  function onRemove( id: number):void{
    dispatch({
        type:"REMOVE",
        id
    })
  }

  useEffect(()=>{
    dispatch({
      type:"ONLOAD"
  })
  },[])

  return (
    <div className="App">

      <input type={'text'} ref={inputRef}/>
      <button onClick={onAddTodo}>Add me</button>
      {todos.map( (todo) => <div key={todo.id}> 
        {todo.text}
        <button onClick={ () => onRemove(todo.id)}>Remove</button>
      </div> )}
    </div>
  )
}

export default App
