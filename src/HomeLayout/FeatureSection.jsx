import { FaTasks, FaUsers, FaPenFancy, FaChartLine } from "react-icons/fa";

const FeatureSection = () => {
  const features = [
    {
      title: "Create Assignments",
      description: "Easily create study assignments and share with all your study friends.",
      icon: <FaPenFancy className="text-3xl text-[#342995]" />,
    },
    {
      title: "Submit Solutions",
      description: "Complete your friends' assignments and submit your own responses for grading.",
      icon: <FaTasks className="text-3xl text-[#342995]" />,
    },
    {
      title: "Peer Grading",
      description: "Grade others’ work and receive feedback on your own — collaborative learning at its best.",
      icon: <FaUsers className="text-3xl text-[#342995]" />,
    },
    {
      title: "Progress Tracking",
      description: "See your completed, pending, and graded assignments in one place.",
      icon: <FaChartLine className="text-3xl text-[#342995]" />,
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#342995] mb-10">Awesome Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#342995]">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
