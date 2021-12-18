import React from "react";
import { Outlet} from "react-router-dom"
import Modal from "./AddTodoModal";

function GuestContainer(){

  const [modalIsOpen, setModalOpen] = React.useState(false);
  
    return (
      <div className="container">

        <div className="row mt-3">
          <div className="col-md-3">
            <button type="button" className="btn btn-primary" onClick={() => setModalOpen(true)} >
              Launch demo modal
            </button>
          </div>
          <div className="col-md-9">
                <Outlet />
          </div>
        </div>
       
          <Modal modalIsOpen={modalIsOpen} setModalOpen={setModalOpen} />
      </div>
    );
  }

export default GuestContainer; 