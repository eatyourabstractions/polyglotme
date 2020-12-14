import React from 'react';

import styled from 'styled-components';



import { Droppable, Draggable } from 'react-beautiful-dnd';

function MyLists({characters, listId, height}) {


    
       
    return (
        <Droppable droppableId={listId} direction={'horizontal'}>
            {(provided) => (
           
              <ul className="characters" 
              {...provided.droppableProps}
               ref={provided.innerRef}>
                {characters.map(({id, name}, index) => {
                  return (
                   <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                      <li 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                        >
                        
                        <p>
                          { name }
                        </p>
                      </li>)}
                   </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            
            )}
          </Droppable>
    )
}
//<ul className="characters" 

export default MyLists

const Container = styled.ul`
   list-style: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  min-width: 600px;
  /* stop the list collapsing when it has no items */
  min-height: ${props => props.height};
  width: 150px;
  background-color: lightgray;
  
  display: inline-flex;
`;

