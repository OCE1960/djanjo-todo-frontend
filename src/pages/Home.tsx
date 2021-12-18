import React, {useState, useEffect} from "react"
import { useAppDispatch, useAppSelector } from "../state-management/hooks"
import { getAllTodos, selectAllTodos, getTodoById } from "../state-management/features/todoSlice"
import Modal from "../components/EditTodoModal"

function Home() {
  const [errorMessage, setErrorMessage] = useState("");
  const [modalIsOpen, setModalOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const allTodos = useAppSelector(selectAllTodos);
  const uncompletedTodos = allTodos.filter(todo => todo.completed === false);
  const handleEdit = async (id:string, e:any) => {
    const apiResponse = await dispatch(getTodoById(id)).unwrap()
     setModalOpen(prevState => !prevState);
}
  const renderTodos = allTodos.map(todo => (
                                              <>
                                                  <div className="col-md-4 shadow p-3 mb-5 bg-body rounded" key={todo.id}>
                                                      <div className="">
                                                          <div className="card-body">
                                                            <h5 className="card-title">{todo.title}</h5>
                                                            <p className="card-text"> {todo.description} </p>
                                                            <p> Status: { todo.completed ? <span className="text-success">completed</span> : <span className="text-danger">Uncompleted</span>} </p>
                                                              <a href="#" onClick={(e) => handleEdit(todo.id, e)} className="btn btn-primary">Edit</a> 
                                                          </div>
                                                      </div>
                                                  </div>
                                              </>
                                            ))

  useEffect( () => {
    dispatch(getAllTodos()).unwrap()
    .then((promiseResult) => {
      setErrorMessage("");
    })
    .catch((errorResponse) => {
      setErrorMessage(errorResponse.message);
    })
    }, 
    [dispatch]
  ) 


  return (
      <>
        <main>
          <h2>You have {uncompletedTodos.length } Todos Remaining</h2>
          <div className="row g-2">
            { renderTodos }
          </div>
        </main>
        <Modal modalIsOpen={modalIsOpen} setModalOpen={setModalOpen} />
      </>
    );
  }

export default Home;