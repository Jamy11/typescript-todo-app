import React from 'react'

const List = ( { items , onclick } : {
    items: string[],
    onclick: (text:string)=>void ;
} ) => {

  return (

    <div>

      { items.map((item, index)=> <li key={index}  onClick={ ()=>onclick(item) }> {item} </li> ) }

    </div>
    
  )
}

export default List