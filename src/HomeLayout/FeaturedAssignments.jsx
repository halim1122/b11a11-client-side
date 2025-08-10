import { useState } from "react";
import { FaFileAlt, FaLaptopCode, FaFlask } from "react-icons/fa";

const assignmentsData = [
  { id: 1, title: "Build a Portfolio Website", description: "Create a personal portfolio using HTML, CSS, and JavaScript.", icon: <FaLaptopCode className="text-3xl text-blue-500" /> },
  { id: 2, title: "Science Research Report", description: "Write a detailed research paper on renewable energy sources.", icon: <FaFlask className="text-3xl text-green-500" /> },
  { id: 3, title: "Essay on Climate Change", description: "Discuss the effects of global warming and climate change.", icon: <FaFileAlt className="text-3xl text-yellow-500" /> },
  { id: 4, title: "JavaScript Calculator", description: "Develop a basic calculator using JavaScript functions.", icon: <FaLaptopCode className="text-3xl text-purple-500" /> },
  { id: 5, title: "Lab Experiment Report", description: "Record your observations and results from the chemistry experiment.", icon: <FaFlask className="text-3xl text-red-500" /> },
  { id: 6, title: "Creative Writing Assignment", description: "Write a short story using any theme of your choice.", icon: <FaFileAlt className="text-3xl text-pink-500" /> },
  { id: 7, title: "Math Problem Set", description: "Solve algebra and geometry problems from the given worksheet.", icon: <FaFileAlt className="text-3xl text-orange-500" /> },
  { id: 8, title: "React Blog Project", description: "Build a blog website using React and TailwindCSS.", icon: <FaLaptopCode className="text-3xl text-teal-500" /> },
  { id: 9, title: "Physics Experiment", description: "Conduct an experiment and explain Newton's Laws.", icon: <FaFlask className="text-3xl text-indigo-500" /> },
  { id: 10, title: "Literature Review", description: "Summarize and critique an academic research paper.", icon: <FaFileAlt className="text-3xl text-gray-500" /> },
  { id: 11, title: "Portfolio Redesign", description: "Redesign your old portfolio using modern UI/UX trends.", icon: <FaLaptopCode className="text-3xl text-lime-500" /> },
  { id: 12, title: "Chemistry Lab Report", description: "Submit a detailed report of your latest lab experiment.", icon: <FaFlask className="text-3xl text-cyan-500" /> },
  { id: 13, title: "Build a Portfolio Website", description: "Create a personal portfolio using HTML, CSS, and JavaScript.", icon: <FaLaptopCode className="text-3xl text-blue-500" /> },
  { id: 14, title: "Science Research Report", description: "Write a detailed research paper on renewable energy sources.", icon: <FaFlask className="text-3xl text-green-500" /> },
  { id: 15, title: "Essay on Climate Change", description: "Discuss the effects of global warming and climate change.", icon: <FaFileAlt className="text-3xl text-yellow-500" /> },
  { id: 16, title: "JavaScript Calculator", description: "Develop a basic calculator using JavaScript functions.", icon: <FaLaptopCode className="text-3xl text-purple-500" /> },
  { id: 17, title: "Lab Experiment Report", description: "Record your observations and results from the chemistry experiment.", icon: <FaFlask className="text-3xl text-red-500" /> },
  { id: 18, title: "Creative Writing Assignment", description: "Write a short story using any theme of your choice.", icon: <FaFileAlt className="text-3xl text-pink-500" /> },
  { id: 19, title: "Math Problem Set", description: "Solve algebra and geometry problems from the given worksheet.", icon: <FaFileAlt className="text-3xl text-orange-500" /> },
  { id: 20, title: "React Blog Project", description: "Build a blog website using React and TailwindCSS.", icon: <FaLaptopCode className="text-3xl text-teal-500" /> },
  { id: 21, title: "Physics Experiment", description: "Conduct an experiment and explain Newton's Laws.", icon: <FaFlask className="text-3xl text-indigo-500" /> },
  { id: 22, title: "Literature Review", description: "Summarize and critique an academic research paper.", icon: <FaFileAlt className="text-3xl text-gray-500" /> },
  { id: 23, title: "Portfolio Redesign", description: "Redesign your old portfolio using modern UI/UX trends.", icon: <FaLaptopCode className="text-3xl text-lime-500" /> },
  { id: 24, title: "Chemistry Lab Report", description: "Submit a detailed report of your latest lab experiment.", icon: <FaFlask className="text-3xl text-cyan-500" /> },
];
const FeaturedAssignments = () => {
 const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const totalPages = Math.ceil(assignmentsData.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentAssignments = assignmentsData.slice(startIndex, startIndex + cardsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="pb-20 px-4">
      <h2 className="text-3xl font-bold text-center text-primary mb-10">Featured Assignments</h2>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {currentAssignments.map((assignment) => (
          <div key={assignment.id} className="border border-gray-100 rounded-lg shadow-md p-5 flex flex-col items-start gap-3 hover:shadow-lg transition-shadow duration-300">
            <div>{assignment.icon}</div>
            <h3 className="text-lg font-semibold">{assignment.title}</h3>
            <p className="text-gray-400 text-sm">{assignment.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded border ${currentPage === index + 1 ? "bg-blue-500 text-white" : "border-gray-300"}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
export default FeaturedAssignments;