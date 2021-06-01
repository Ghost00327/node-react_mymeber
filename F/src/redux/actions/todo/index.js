import axios from "axios"
import { history } from "../../../history"

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getTodos = routeParams => {
  return async dispatch => {
    await axios
      .get("api/apps/todo", {
        params: routeParams
      })
      .then(result => {
        dispatch({
          type: "GET_TODOS",
          todos: result.data,
          routeParams
        })
      })
      .catch(err => console.log(err))
  }
}

export const GET_TODOS = (filter) => {
  return async dispatch => {
    try{
       let userId = localStorage.getItem("user_id") || "";
       let token = localStorage.getItem("access_token");
       let response
       if (filter == "today"){
        response = await axios.get(`${baseUrl}/api/today_taskread/${userId}`, {
          headers : {
            "Authorization" : `Bearer ${token}`,
          }
        });
       }
       else if(filter == "tomorrow"){
        response = await axios.get(`${baseUrl}/api/tomorrow_taskread/${userId}`, {
          headers : {
            "Authorization" : `Bearer ${token}`,
          }
        });
       }
       else if(filter == "upcoming"){
        response = await axios.get(`${baseUrl}/api/upcoming_taskread/${userId}`, {
          headers : {
            "Authorization" : `Bearer ${token}`,
          }
        });
       }
       else if(filter == "completed"){
        response = await axios.get(`${baseUrl}/api/completed_taskread/${userId}`, {
          headers : {
            "Authorization" : `Bearer ${token}`,
          }
        });
       }
       else if(filter == "notcompleted"){
        response = await axios.get(`${baseUrl}/api/not_completed_taskread/${userId}`, {
          headers : {
            "Authorization" : `Bearer ${token}`,
          }
        });
       }
       else if(filter == "events"){
        response = await axios.get(`${baseUrl}/api/events_taskread/${userId}`, {
          headers : {
            "Authorization" : `Bearer ${token}`,
          }
        });
       }
       else if(filter == "business"){
        response = await axios.get(`${baseUrl}/api/business_taskread/${userId}`, {
          headers : {
            "Authorization" : `Bearer ${token}`,
          }
        });
       }
       else if(filter == "personal"){
        response = await axios.get(`${baseUrl}/api/personal_taskread/${userId}`, {
          headers : {
            "Authorization" : `Bearer ${token}`,
          }
        });
       }
       else if(filter == "appointment"){
        response = await axios.get(`${baseUrl}/api/appointment_taskread/${userId}`, {
          headers : {
            "Authorization" : `Bearer ${token}`,
          }
        });
       }else{
        response = await axios.get(`${baseUrl}/api/list_of_task/${userId}`, {
          headers : {
            "Authorization" : `Bearer ${token}`,
          }
        });
       }
       
       if(response.data && response.status === 200){
          console.log('filter', filter)

          dispatch({
            type : "GET_TODOS_ALL",
            payload : {
              todos : response.data,
              routeParams : filter
            },
          })         
       }
    }
    catch(error){
      console.log(error);
    }
  }
}
export const completeTask = todo => {
  return dispatch => {
    dispatch({ type: "COMPLETE_TASK", id: todo.id, value: todo.isCompleted })
  }
}

export const starTask = todo => {
  return dispatch => {
    Promise.all([
      dispatch({ type: "STAR_TASK", id: todo.id, value: todo.isStarred })
    ])
  }
}

export const importantTask = todo => {
  
  return dispatch => {
    Promise.all([
      dispatch({ type: "IMPORTANT_TASK", id: todo.id, value: todo.isImportant })
    ])
  }
}

export const trashTask = id => {
  return (dispatch, getState) => {
    axios
      .delete(`${baseUrl}/api/delete_task/${localStorage.getItem("user_id")}/${id}`, {
        headers : {
          "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      .then(res => {
        dispatch(GET_TODOS());
      })
      // const params = getState().todoApp.todo.routeParam
      // .post("/api/app/todo/trash-todo", id)
      // .then(response => dispatch({ type: "TRASH_TASK", id }))
      // .then(dispatch(getTodos(params)))
  }
}

export const updateTodo = todo => {
  const request = axios.post("/api/apps/todo/update-todo", todo)
  return (dispatch, getState) => {
    const params = getState().todoApp.todo.routeParam
    request.then(response => {
      Promise.all([
        dispatch({
          type: "UPDATE_TODO",
          todos: response.data
        })
      ]).then(() => dispatch(getTodos(params)))
    })
  }
}

export const updateTask = (id, task) => {
  return dispatch => {
    axios.put(`${baseUrl}/api/update_task/${localStorage.getItem("user_id")}/${id}`, {...task}, {
      headers : {
        "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
      }
    }).then(res => {
      dispatch(GET_TODOS());
    })
    
  }
}

export const updateLabel = (id, label) => {
  return (dispatch, getState) => {
    dispatch({ type: "UPDATE_LABEL", label, id })
  }
}

export const addNewTask = task => {
  return (dispatch, getState) => {
    const params = getState().todoApp.todo.routeParam
    axios.post("/api/apps/todo/new-task", { task }).then(response => {
      dispatch({ type: "ADD_TASK", task })
      dispatch(getTodos(params))
    })
  }
}

export const ADD_NEW_TASK = task => {
  return dispatch => {
     axios.post(`${baseUrl}/api/add_task/${localStorage.getItem("user_id")}`, {...task}, {
      headers : {
        "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
      }
    }).then(res => {
      dispatch(GET_TODOS());
    })
  }
}


// export const searchTask = val => {
//   return dispatch => {
//     dispatch({
//       type: "SEARCH_TASK",
//       val
//     })
//   }
// }
export const searchTask = val => {
  return dispatch => {
    axios.get(`${baseUrl}/api/searching_task/${localStorage.getItem("user_id")}?q=${val}`, {
     headers : {
       "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
     }
   }).then(res => {
    // if(response.data && response.status === 200){
      console.log('search res', res)

      dispatch({
        type : "GET_TODOS_ALL",
        payload : {
          todos : res.data,
          // routeParams : filter
        },
      })         
  //  }
    //  dispatch(GET_TODOS());
   })
 }
}

export const changeFilter = filter => {
  return dispatch => {
    dispatch({ type: "CHANGE_FILTER", filter })
    history.push(`/todo/${filter}`)
    dispatch(GET_TODOS(filter))
  }
}
