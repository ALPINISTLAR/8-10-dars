import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './App.css';

const App = () => {
  const [divs, setDivs] = useState([
    { id: 'div-1', title: 'Bajarilgan ishlar', inputs: [{ id: 'input-1-1', value: '', disabled: false }, { id: 'input-1-2', value: '', disabled: false }] },
    { id: 'div-2', title: 'Bajarilayotgan ishlar', inputs: [{ id: 'input-2-1', value: '', disabled: false }, { id: 'input-2-2', value: '', disabled: false }] },
    { id: 'div-3', title: 'Rejalashtirilgan ishlar', inputs: [{ id: 'input-3-1', value: '', disabled: false }, { id: 'input-3-2', value: '', disabled: false }] },
  ]);

  const handleAddInput = (divId) => {
    setDivs(divs.map(div =>
      div.id === divId ? {
        ...div,
        inputs: [...div.inputs, { id: `input-${div.id}-${div.inputs.length + 1}`, value: '', disabled: false }]
      } : div
      ));
    };

    const handleSaveInputs = (divId) => {
      setDivs(divs.map(div =>
        div.id === divId ? {
          ...div,
          inputs: div.inputs.map(input =>
            input.value ? { ...input, disabled: true } : input
            )
          } : div
          ));
        };

        const handleDeleteInput = (divId, inputId) => {
          setDivs(divs.map(div =>
            div.id === divId ? {
              ...div,
              inputs: div.inputs.filter(input => input.id !== inputId)
            } : div
            ));
          };

          const handleInputChange = (divId, inputId, value) => {
            setDivs(divs.map(div =>
              div.id === divId ? {
                ...div,
                inputs: div.inputs.map(input =>
                  input.id === inputId ? { ...input, value } : input
                  )
                } : div
                ));
              };

              const onDragEnd = (result) => {
                const { source, destination } = result;
                if (!destination) return;

                const sourceDiv = divs.find(div => div.id === source.droppableId);
                const destDiv = divs.find(div => div.id === destination.droppableId);
                const sourceInputs = Array.from(sourceDiv.inputs);
                const [removed] = sourceInputs.splice(source.index, 1);

                if (source.droppableId === destination.droppableId) {
                  sourceInputs.splice(destination.index, 0, removed);
                  setDivs(divs.map(div =>
                    div.id === source.droppableId ? { ...div, inputs: sourceInputs } : div
                    ));
                  } else {
                    const destInputs = Array.from(destDiv.inputs);
                    destInputs.splice(destination.index, 0, removed);
                    setDivs(divs.map(div =>
                      div.id === source.droppableId ? { ...div, inputs: sourceInputs } :
                      div.id === destination.droppableId ? { ...div, inputs: destInputs } : div
                      ));
                    }
                  };

                  return (
                    <DragDropContext onDragEnd={onDragEnd}>
                    <div className="app">
                    {divs.map(div => (
                      <Droppable key={div.id} droppableId={div.id}>
                      {(provided) => (
                        <div
                        className="div-container"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                        <h2 className="title">{div.title}</h2>
                        <div className="div-inner-container">
                        {div.inputs.map((input, index) => (
                          <Draggable key={input.id} draggableId={input.id} index={index}>
                          {(provided) => (
                            <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="input-container"
                            >
                            <input
                            type="text"
                            value={input.value}
                            onChange={(e) => handleInputChange(div.id, input.id, e.target.value)}
                            disabled={input.disabled}
                            />
                            <button className='trash' onClick={() => handleDeleteInput(div.id, input.id)}>
                           </button>
                            </div>
                            )}
                            </Draggable>
                            ))}
                            {provided.placeholder}
                            <div className="btn-wrapper">
                            <button onClick={() => handleAddInput(div.id)}>Add</button>
                            <button onClick={() => handleSaveInputs(div.id)}>Save</button>
                            </div>
                            </div>
                            </div>
                            )}
                            </Droppable>
                            ))}
                            </div>
                            </DragDropContext>
                            );
                          };

                          export default App;
