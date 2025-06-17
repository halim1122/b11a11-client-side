import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const Update = () => {

     const { user } = useContext(AuthContext);

     const [dueDate, setDueDate] = useState(new Date());
     const navigate = useNavigate();

     const data = useLoaderData();
     // console.log(data)

     const { _id, marks, title, description, thumbnail, level, dueDate: date, creatorEmail } = data;

     // UPDATE functionality-------------

     const handleUpDateAssignment = (e) => {
          e.preventDefault();
          const form = e.target;

          const formData = new FormData(form);
          const assignment = Object.fromEntries(formData.entries());

          // Convert fields to proper types
          assignment.marks = parseInt(assignment.marks);
          assignment.dueDate = dueDate;
          assignment.creatorEmail = user?.email || 'unknown';
          assignment.creatorName = user?.displayName || 'Anonymous';

          if (user?.email === creatorEmail) {
               Swal.fire({
                    title: "Are you sure?",
                    text: "You Update this assignment",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes"
               }).then((result) => {
                    if (result.isConfirmed) {
                         axios.put(`http://localhost:3000/assignment/${_id}`, assignment)
                              .then(() => {
                                   navigate('/assignments');
                                   Swal.fire({
                                        title: "Updated",
                                        text: "Your assignment has been Updated.",
                                        icon: "success"
                                   });
                              }).catch(error => console.log(error));
                    }
               });
          } else {
               navigate('/assignments');
               Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You not create this assignment",
               });
          }
     }
     return (
          <div className='max-w-xl mx-auto p-6 bg-white rounded my-3 shadow-2xl shadow-[#342995]'>
               <Helmet>
                         <title>
                              update-assignments
                         </title>
                    </Helmet>
               <h2 className='text-2xl font-bold mb-4 text-center text-[#342995]'>Update Your Assignment</h2>

               <form onSubmit={handleUpDateAssignment} className='space-y-4'>

                    <input
                         name="title"
                         defaultValue={title}
                         type="text"
                         placeholder="Assignment Title"
                         className="input input-bordered w-full"
                         required
                    />

                    <textarea
                         name="description"
                         defaultValue={description}
                         placeholder="Description"
                         className="textarea textarea-bordered w-full"
                         required
                    ></textarea>

                    <input
                         name="marks"
                         defaultValue={marks}
                         type="number"
                         placeholder="Marks"
                         className="input input-bordered w-full"
                         required
                    />

                    <input
                         name="thumbnail"
                         defaultValue={thumbnail}
                         type="url"
                         placeholder="Thumbnail Image URL"
                         className="input input-bordered w-full"
                         required
                    />

                    <select
                         name="level"
                         className="select select-bordered w-full"
                         defaultValue={level}
                         required
                    >
                         <option value="easy">Easy</option>
                         <option value="medium">Medium</option>
                         <option value="hard">Hard</option>
                    </select>

                    <div>
                         <label className="font-medium mb-1 block">Due Date</label>
                         <DatePicker
                              selected={dueDate}
                              defaultValue={date}
                              onChange={(date) => setDueDate(date)}
                              className="input input-bordered w-full"
                              dateFormat="yyyy/MM/dd"
                              required
                         />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">UpDate Assignment</button>
               </form>
          </div>
     );
};

export default Update;