export default function FAQ() {
  return (
    <div className="w-full flex justify-center text-black dark:text-white">
      <div className="w-full max-w-5xl flex justify-center items-center flex-col text-left px-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
        <p className="text-center">We are here to help you with any questions you may have. If you don't find what you need, please contact us at <a href="mailto:" className="text-violet-400 hover:underline">support@example.com</a></p>

        {/* Mobile view */}
        <div className="md:hidden flex flex-col gap-4 mt-8">
          {faqData.map((faq, idx) => (
            <FAQCard key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Tablet view */}
        <div className="hidden md:flex xl:hidden gap-6 mt-8">
          <div className="flex flex-col gap-4 w-1/2">
            {faqData.slice(0, faqData.length / 2).map((faq, idx) => (
              <FAQCard key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            {faqData.slice(faqData.length / 2).map((faq, idx) => (
              <FAQCard key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>        
        </div>

        {/* Desktop view */}
        <div className="hidden xl:flex gap-6 mt-8">
          <div className="flex flex-col gap-4 w-1/3">
            {faqData.slice(0, faqData.length / 3).map((faq, idx) => (
              <FAQCard key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <div className="flex flex-col gap-4 w-1/3">
            {faqData.slice(faqData.length / 3, faqData.length / 3 * 2).map((faq, idx) => (
              <FAQCard key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <div className="flex flex-col gap-4 w-1/3">
            {faqData.slice(faqData.length / 3 * 2).map((faq, idx) => (
              <FAQCard key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>        
        </div>

      </div>
    </div>
  )
}

interface FAQCardProps {
  question: string;
  answer: string;
}

// faq card props
function FAQCard ({question, answer} : FAQCardProps) {
  return (
    <div className="flex flex-col gap-4 p-8 rounded-lg bg-[#eaeaea] dark:bg-[#262626] h-fit w-full">
      <h2 className="text-lg font-bold text-black dark:text-[#fdfdfd]">{question}</h2>
      <p className="text-gray-700 dark:text-[#afafaf]">{answer}</p>
    </div>
  )
}

const faqData = [
  {
    question: "What is DreamCapture?",
    answer: "DreamCapture is an AI-powered dream journal that allows you to log your dreams, generate stunning 360° AI dreamscapes, and share them with a community of dream enthusiasts."
  },
  {
    question: "How does DreamCapture work?",
    answer: "Simply log your dreams in the journal, and our AI will generate immersive visuals based on your descriptions. You can explore insights, track dream patterns, and share your dreams with others."
  },
  {
    question: "Can I keep my dream entries private?",
    answer: "Yes! You can choose to keep your dreams private, share them with specific friends, or make them public for the community to explore."
  },
  {
    question: "Can I edit or delete my dream entries?",
    answer: "Absolutely! You can edit, update, or delete your dreams at any time from your journal."
  },
  {
    question: "How does the AI generate dream visuals?",
    answer: "Our AI analyzes the details in your dream journal entry and uses deep learning models to create unique, immersive 360° dreamscapes."
  },
  {
    question: "What if the AI-generated dreamscape doesn’t match my dream?",
    answer: "AI-generated images are based on interpretation, but you can refine descriptions or adjust settings for a closer match."
  },
  {
    question: "Can I share my dreamscapes with friends?",
    answer: "Yes! You can share dreamscapes publicly, with selected users, or keep them private."
  },
  {
    question: "Is there a way to explore other people’s dreams?",
    answer: "Yes, you can browse a community gallery of dreamscapes and read other users' dream interpretations."
  },
  {
    question: "Is DreamCapture free to use?",
    answer: "We offer a free plan with basic features. A premium plan unlocks unlimited AI dream generations, deeper insights, and more sharing options."
  },
  {
    question: "How do I upgrade to a premium plan?",
    answer: "You can upgrade from your account settings. We offer flexible monthly and yearly subscription options."
  },
  {
    question: "Can I use DreamCapture on my phone?",
    answer: "Yes! DreamCapture is fully responsive and works seamlessly on desktops, tablets, and mobile devices."
  }
];
