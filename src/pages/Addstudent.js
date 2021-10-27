import axios from 'axios';
import React,{ Component } from  'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';


class Addstudent extends Component
{

   state = {
      name : '',
      course : '',
      email : '',
      phone : '',
      err_list: []
   }

   handleInput = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        })
   }

   saveForm =  async (e) => {
      e.preventDefault();
      const res = await axios.post('http://localhost:8000/api/add-student', this.state);

      if(res.data.status === 200)
      {
           console.log(res.data.message);

           swal({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            button: "Ok",
          });

           this.setState({
             name : '',
             course : '',
             email : '',
             phone : ''
           })
      }else{
          this.setState({
             err_list : res.data.validate_err
          })
      }

   }

    render(){
          return(
            <div className="container">
            <div className="row">
               <div className="col-md-6">
                   <div className="card">
                       <div className="card-header">
                          <h4>Add Student</h4>
                           <Link to={`/`} className="btn btn-primary btn-sm float-end">Go Back</Link>
                       </div>
                       <div className="card-body">
                           <form onSubmit={this.saveForm}>
                               <div className="form-group mb-3">
                                  <label>Student Name</label>
                                  <input type="text"  name="name"  className="form-control"  onChange={this.handleInput} value={this.state.name} />
                                  <span className="text-danger">{this.state.err_list.name}</span>
                               </div>
                               <div className="form-group mb-3">
                                  <label>Student Course</label>
                                  <input type="text"  name="course"  className="form-control" onChange={this.handleInput} value={this.state.course} />
                                  <span className="text-danger">{this.state.err_list.course}</span>
                               </div>
                               <div className="form-group mb-3">
                                  <label>Student Email</label>
                                  <input type="text"  name="email" className="form-control"  onChange={this.handleInput} value={this.state.email} />
                                  <span className="text-danger">{this.state.err_list.email}</span>
                               </div>
                               <div className="form-group mb-3">
                                  <label>Student Phone</label>
                                  <input type="text"  name="phone" className="form-control"  onChange={this.handleInput} value={this.state.phone}/>
                                  <span className="text-danger">{this.state.err_list.phone}</span>
                               </div>
                               <div className="form-group mb-3">
                                   <button className="btn btn-primary">Save Student</button>
                               </div>
                           </form>
                      </div>
                   </div>
              </div>
            </div>
         </div>

          )
    }
}

export default Addstudent;