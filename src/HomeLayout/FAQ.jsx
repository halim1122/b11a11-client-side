import { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is BrainBand?",
      answer:
        "BrainBand is an online group study platform where all registered users are friends. You can create, complete, and grade assignments collaboratively.",
    },
    {
      question: "How can I join BrainBand?",
      answer:
        "Just register with your email. Once you're in, you're automatically connected with every other user as a friend.",
    },
    {
     question: " How are assignments graded?",
     answer: "Any user can grade another user's submitted assignment. The grading is peer-reviewed, which ensures fairness and collaborative learning."
    },
    {
     question: "Can I edit or delete my assignments?",
     answer: "Yes. Go to the “My Assignments” section to edit or delete the assignments you created."
    },
    {
      question: "What can I do after logging in?",
      answer:
        "You can create assignments, submit answers to others' assignments, grade your friends, and view your submissions and grades.",
    },
    {
      question: "Is BrainBand free to use?",
      answer: "Yes! BrainBand is completely free for collaborative learning.",
    },
    {
      question: "Can I track my progress?",
      answer:
        "Yes. The Dashboard displays your submitted assignments, grades, and pending reviews.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#342995]">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-md shadow-sm">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-4 py-3 font-semibold text-[#342995] hover:bg-[#f3f4f6] focus:outline-none"
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 text-gray-700 border-t">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
