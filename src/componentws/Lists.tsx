import React from 'react'
import List from './List'

const Lists = (  ) => {
  const items: string[] = ['jamy', 'jamy2', 'jamy3']

  const onclick = ( name : string ) : void =>{
    alert(name)
  }
  return (
    <div> <List items={items} onclick={onclick}/></div>
  )
}

export default Lists