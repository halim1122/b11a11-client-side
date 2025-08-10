import { FaTasks, FaUsers, FaPenFancy, FaChartLine, FaBell } from "react-icons/fa";

const FeatureSection = () => {
  const features = [
    {
      title: "Create Assignments",
      description: "Easily create study assignments and share with all your study friends.",
      icon: <FaPenFancy className="text-3xl text-primary" />,
    },
    {
      title: "Submit Solutions",
      description: "Complete your friends' assignments and submit your own responses for grading.",
      icon: <FaTasks className="text-3xl text-primary" />,
    },
    {
      title: "Peer Grading",
      description: "Grade others’ work and receive feedback on your own — collaborative learning at its best.",
      icon: <FaUsers className="text-3xl text-primary" />,
    },
    {
      title: "Progress Tracking",
      description: "See your completed, pending, and graded assignments in one place.",
      icon: <FaChartLine className="text-3xl text-primary" />,
    },
    {
      title: "Collaboration Tools",
      description: "Discuss assignments with peers and share resources directly on the platform.",
      icon: <FaUsers className="text-3xl text-primary" />,
    },
    {
      title: "Deadline Reminders",
      description: "Get notified before submission dates so you never miss a deadline.",
      icon: <FaBell className="text-3xl text-primary" />,
    },
  ];

  return (
    <div className="py-12 bg-base-200 text-base-content transition-all">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">Awesome Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center border border-base-300"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
              <p className="text-sm text-base-content/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
