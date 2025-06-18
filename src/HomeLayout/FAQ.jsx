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
      question: "How are assignments graded?",
      answer:
        "Any user can grade another user's submitted assignment. The grading is peer-reviewed, which ensures fairness and collaborative learning.",
    },
    {
      question: "Can I edit or delete my assignments?",
      answer:
        "Yes. Go to the “My Assignments” section to edit or delete the assignments you created.",
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
    <div className="max-w-3xl mx-auto my-10 p-6 rounded-xl shadow-lg bg-white text-gray-800 dark:bg-[#1e1e2f] dark:text-amber-800 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#342995] dark:text-white">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-md bg-gray-50 dark:bg-[#2d2d44] border-gray-300 dark:border-[#444] transition-all duration-200"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-4 py-3 font-semibold text-[#342995] dark:text-white hover:bg-gray-100 dark:hover:bg-[#3b3b55] focus:outline-none"
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-[#555]">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
