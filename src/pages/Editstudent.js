import axios from 'axios';
import React,{ Component } from  'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

class Editstudent extends Component
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

   async componentDidMount(){

         const stud_id = this.props.match.params.id;
   
        const res = await axios.get(`http://localhost:8000/api/edit-student/${stud_id}`);

             console.log(res);

        if(res.data.status === 200)
        {
             this.setState({
                name : res.data.student.name,
                course : res.data.student.course,
                email : res.data.student.email,
                phone : res.data.student.phone
             })
        }else if(res.data.status === 404){
             
         swal({
            title: "Warning!",
            text: res.data.message,
            icon: "warning",
            button: "Ok",
          });

          this.props.history.push('/'); //Will go back to home page
        }
   }

   updateStudent =  async (e) => {
      e.preventDefault();
      
      // document.getElementById('btnupdate').disabled = true;
      // document.getElementById('btnupdate').innerText = "Updating...";

      const stud_id = this.props.match.params.id;
   
      const res = await axios.put(`http://localhost:8000/api/update-student/${stud_id}`, this.state);

      if(res.data.status === 200)
      {
         //   console.log(res.data.message);
         swal({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            button: "Ok",
          });
         //   document.getElementById('btnupdate').disabled = false;
         //   document.getElementById('btnupdate').innerText ='Update Student';

           this.props.history.push('/'); //Will go back to home page
      }else if(res.data.status === 404){
             
         swal({
            title: "Warning!",
            text: res.data.message,
            icon: "warning",
            button: "Ok",
          });

          this.props.history.push('/'); //Will go back to home page
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
                          <h4>Edit Student</h4>
                           <Link to={`/`} className="btn btn-primary btn-sm float-end">Go Back</Link>
                       </div>
                       <div className="card-body">
                           <form onSubmit={this.updateStudent}>
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
                                   <button className="btn btn-primary" id="btnupdate">Update Student</button>
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

export default Editstudent;