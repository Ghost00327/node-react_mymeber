import React from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Media
} from "reactstrap"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"


const listItems = [
  {
    id: "1",
    name: "Mary S. Navarre",
    content:
      "Chupa chups tiramisu apple pie biscuit sweet roll bonbon macaroon toffee icing."
  },
  {
    id: "2",
    name: "Samuel M. Ellis",
    content: "Toffee powder marzipan tiramisu. Cake cake dessert danish."
  },
  {
    id: "3",
    name: "Sandra C. Toney",
    content:
      "Sugar plum fruitcake gummies marzipan liquorice tiramisu. Pastry liquorice chupa chupsake."
  },
  {
    id: "4",
    name: "Cleveland C. Goins",
    content: "Toffee powder marzipan tiramisu. Cake cake dessert danish."
  },
  {
    id: "5",
    name: "Linda M. English",
    content:
      "Chupa chups tiramisu apple pie biscuit sweet roll bonbon macaroon toffee icing."
  }
]

// get data from array
const getItems = count =>
  listItems.map(k => ({
    id: k.id,
    content: k.content,
    name: k.name
  }))

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

class DndVertical extends React.Component {
  state = {
    items: getItems()
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    )

    this.setState({
      items
    })
  }

  render() {
    return (
      <>
         <h6>Drag and drop messages to change their order.</h6>
        
            
          <ListGroup id="list-group-dnd">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef}>
                    {this.state.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="drag-wrapper"
                          >
                            <ListGroupItem>
                              <Media>
                                <Media left tag="div">
                                  {/* <Media
                                    object
                                    className="rounded-circle mr-2"
                                    alt="Generic placeholder image"
                                    height="50"
                                    width="50"
                                  /> */}
                                </Media>
                                <Media body>
                                  <h5 className="mt-0">{item.name}</h5>
                                  {item.content}
                                </Media>
                              </Media>
                            </ListGroupItem>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </ListGroup>
       
      </>
    )
  }
}

export default DndVertical
