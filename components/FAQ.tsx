// components/FAQ.tsx
"use client";
import React, { useState } from 'react';
import './FAQ.css'; 

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What documents do I need to rent a car?",
    answer: "You need a valid driver's license, a government-issued ID(Aadhar, Voter or PAN card), and a credit/debit card.",
  },
  {
    question: "Can I return the car to a different location?",
    answer: "Yes, we offer one-way rentals between select cities in Karnataka. Extra fees may apply.",
  },
  {
    question: "Are there any mileage limits?",
    answer: "Most rentals come with unlimited mileage, but some packages may have limits. Please check your plan.",
  },
  {
    question: "What happens if the car breaks down?",
    answer: "We offer 24/7 roadside assistance. Just call our support number for help.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            {item.question}
            <span className="arrow">{openIndex === index ? '▲' : '▼'}</span>
          </div>
          <div className="faq-answer">{openIndex === index && <p>{item.answer}</p>}</div>
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
