import React, { useState } from "react"
import { Button, Modal} from "react-bootstrap"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector} from "../state-management/hooks"
import { store, update, getAllTodos } from "../state-management/features/todoSlice"
import Swal from "sweetalert2";
import Spinner from "./Spinner";

type ModalProps = {
    modalIsOpen : boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

const AddTodoModal: React.FC<ModalProps> = ({ modalIsOpen, setModalOpen } : ModalProps) => {
  const dispatch = useAppDispatch();
  const initialValues = { title:  "", is_completed: "", description: ""};
  
    return (
      <>
        <Modal show={modalIsOpen} onHide={setModalOpen} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Todo</Modal.Title>
          </Modal.Header>
          

        <Formik
        enableReinitialize={true}
       initialValues={initialValues}
       validationSchema={Yup.object({
              title : Yup.string().required(`Title is Required`),
              description : Yup.string().required(`Description is Required`),
          })}
          onSubmit={ async (values, actions) => {
            let formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("completed", values.is_completed);
 
            try {
                  
                  const submitResponse = await dispatch(store(formData)).unwrap();

                  console.log(submitResponse);
                 
                  if(submitResponse){
                    Swal.fire({
                      position: 'top-end',
                      title: 'Content Successfully Created',
                      icon: 'success',
                      showConfirmButton: false,
                      timer: 2000
                    })
                    setTimeout(() => {
                                        dispatch(getAllTodos())
                                        actions.resetForm();
                                        setModalOpen(false);
                                      }, 300);
      
                  }else{
                    let errorResponses = [];
                    for (const key in submitResponse.errors) {
                      errorResponses.push(submitResponse.errors[key]); 
                    }
                    const display_err = errorResponses.map((error, index) => (
                            <li className="p-1" key={index}>  {error}</li>
                    ))
                    actions.setStatus(<ol className="list-decimal p-4 bg-red-600 "> { display_err } </ol>);
                  }
                } catch (err) {
                    console.log(err);
                }   

          }}
     >
       {({
         isSubmitting,
         isValid,
         status,
       }) => (
        
         <Form className="form" >
             
             <Modal.Body>
           <div className="row">
            { isSubmitting && <Spinner /> }
            { status &&  <div className="text-white col-md-12 "> { status } </div>   }
           
            <div className="co-md-12 mb-4">
              <label className="block" htmlFor="title">
                Title
              </label>
              <Field
                type="text"
                name="title"
                className="form-control"
              />
              <ErrorMessage name="title" component="div" className="text-danger" />
            </div>

            <div className="co-md-12">
              <label className="block" htmlFor="description">
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                className="form-control"
                rows={2}
              />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>

            <div className="co-md-12 mt-4">
              <Field type="checkbox" name="is_completed" className="form-check-input me-4"/> Completed
              <ErrorMessage name="is_completed" component="div" className="text-danger" />
            </div>



          </div>

          

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Close
            </Button>
            <button type="submit"  className={`${ ( isValid && !isSubmitting ) ? "btn-primary" : "btn-secondary" } btn`} disabled={isSubmitting} >
                 Save
            </button>
          </Modal.Footer>
         </Form>
       )}
        
     </Formik>
        
         
          
        </Modal>
      </>
    );
  }

  export default AddTodoModal;