import React, { useContext, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';

const CreateAssignment = () => {
  const { user } = useContext(AuthContext);
  const [dueDate, setDueDate] = useState(new Date());
  const navigate = useNavigate();

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    const assignment = Object.fromEntries(formData.entries());

    assignment.marks = parseInt(assignment.marks);
    assignment.dueDate = dueDate;
    assignment.creatorEmail = user?.email || 'unknown';
    assignment.creatorName = user?.displayName || 'Anonymous';

    axios
      .post(`${import.meta.env.VITE_API}/assignments`, assignment)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: '✅ Assignment created successfully',
            icon: 'success',
            confirmButtonColor: '#6366f1'
          });
          navigate('/assignments');
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    form.reset();
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 mb-6 mt-36 rounded shadow-2xl">
      <Helmet>
        <title>Create Assignment</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">Create Assignment</h2>

      <form onSubmit={handleCreateAssignment} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Assignment Title"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        ></textarea>

        <input
          name="marks"
          type="number"
          placeholder="Marks"
          className="input input-bordered w-full"
          required
        />

        <input
          name="thumbnail"
          type="url"
          placeholder="Thumbnail Image URL"
          className="input input-bordered w-full"
          required
        />

        <select
          name="level"
          className="select select-bordered w-full"
          defaultValue="easy"
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
            onChange={(date) => setDueDate(date)}
            className="input input-bordered w-full"
            dateFormat="yyyy/MM/dd"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
