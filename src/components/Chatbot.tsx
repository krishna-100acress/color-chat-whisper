
import React, { useState } from 'react';
import { MessageCircle, X, Send, User, Bot, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface FAQ {
  question: string;
  answer: string;
  keywords: string[];
}

const predefinedFAQs: FAQ[] = [
  {
    question: "What types of properties do you offer?",
    answer: "We offer a wide range of properties including residential apartments, commercial spaces, plots, villas, and SCO (Shop-Cum-Office) units. You can browse through our Buy, Rent, New Launch, Commercial, and Plots sections.",
    keywords: ["property", "types", "residential", "commercial", "apartment", "villa", "plot", "sco"]
  },
  {
    question: "How can I search for properties in specific locations?",
    answer: "You can use our search bar to look for properties by location. We cover top locations including Sohna Road, Golf Course Road, MG Road, Northern Peripheral Road, Dwarka Expressway, and New Gurgaon.",
    keywords: ["search", "location", "area", "sohna", "golf course", "mg road", "dwarka", "gurgaon"]
  },
  {
    question: "Do you offer payment plans for properties?",
    answer: "Yes, we offer flexible payment plans for various properties. Many of our projects come with attractive payment schemes and special offers. Contact our team to know more about specific payment options.",
    keywords: ["payment", "plan", "emi", "finance", "installment", "loan"]
  },
  {
    question: "How can I schedule a site visit?",
    answer: "You can schedule a site visit by clicking on any property listing and using the 'Schedule Visit' option, or you can call our team directly. We arrange guided tours of properties at your convenience.",
    keywords: ["visit", "schedule", "tour", "site", "viewing", "appointment"]
  },
  {
    question: "What documents are required for property purchase?",
    answer: "For property purchase, you'll typically need: Identity proof (Aadhar/PAN), Address proof, Income proof, Bank statements, and photographs. Our team will guide you through the complete documentation process.",
    keywords: ["documents", "papers", "aadhar", "pan", "income", "bank", "purchase"]
  },
  {
    question: "Do you assist with home loans?",
    answer: "Yes, we have tie-ups with leading banks and financial institutions to help you get the best home loan deals. Our team can assist you with loan applications and processing.",
    keywords: ["loan", "home loan", "bank", "finance", "mortgage", "interest"]
  },
  {
    question: "What are the upcoming projects?",
    answer: "We have several exciting new launches coming up. Check our 'New Launch' section for the latest projects with early bird offers and attractive pricing. These include modern apartments and commercial spaces.",
    keywords: ["new", "launch", "upcoming", "project", "latest", "modern"]
  },
  {
    question: "How can I list my property for sale or rent?",
    answer: "You can list your property by clicking on 'List Property' button. It's free to list! Our team will help you with photography, pricing guidance, and marketing your property to potential buyers or tenants.",
    keywords: ["list", "sell", "rent", "property", "free", "marketing"]
  }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm here to help you with your property questions. You can ask me about our services, properties, locations, or any other real estate queries.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const findBestMatch = (userInput: string): FAQ | null => {
    const input = userInput.toLowerCase();
    let bestMatch: FAQ | null = null;
    let maxScore = 0;

    predefinedFAQs.forEach(faq => {
      let score = 0;
      faq.keywords.forEach(keyword => {
        if (input.includes(keyword.toLowerCase())) {
          score += 1;
        }
      });
      
      // Check if question contains user input words
      const inputWords = input.split(' ').filter(word => word.length > 2);
      inputWords.forEach(word => {
        if (faq.question.toLowerCase().includes(word) || faq.answer.toLowerCase().includes(word)) {
          score += 0.5;
        }
      });

      if (score > maxScore) {
        maxScore = score;
        bestMatch = faq;
      }
    });

    return maxScore > 0 ? bestMatch : null;
  };

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Find best matching FAQ
    const bestMatch = findBestMatch(textToSend);
    
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: bestMatch 
          ? bestMatch.answer 
          : "I'd be happy to help you with that! For specific inquiries, please feel free to contact our team directly or browse through our property listings. Is there anything else about our properties or services I can help you with?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const suggestedQuestions = [
    "What types of properties do you offer?",
    "How can I schedule a site visit?",
    "Do you offer payment plans?",
    "What are your upcoming projects?"
  ];

  const getRandomSuggestions = () => {
    const shuffled = [...predefinedFAQs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map(faq => faq.question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 transition-all duration-300 ${
          isExpanded ? 'w-96 h-[500px]' : 'w-80 h-96'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-400 to-yellow-400 rounded-t-2xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Property Assistant</h3>
                <p className="text-white/80 text-xs">Online now</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={message.id}>
                  <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-2 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.isUser 
                          ? 'bg-gradient-to-r from-orange-400 to-yellow-400' 
                          : 'bg-gray-100'
                      }`}>
                        {message.isUser 
                          ? <User className="h-3 w-3 text-white" />
                          : <Bot className="h-3 w-3 text-gray-600" />
                        }
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.isUser
                          ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  </div>

                  {/* Show suggested questions after bot responses */}
                  {!message.isUser && (
                    <div className="mt-3 ml-8 space-y-2">
                      <p className="text-xs text-gray-500 mb-2">You might also ask:</p>
                      {(index === 0 ? suggestedQuestions : getRandomSuggestions()).map((question, qIndex) => (
                        <button
                          key={qIndex}
                          onClick={() => handleQuestionClick(question)}
                          className="block w-full text-left text-xs p-2 bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 rounded-lg transition-colors duration-200 text-gray-700 border border-orange-100"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about properties..."
                className="flex-1 text-sm border-gray-300 focus:border-orange-400 focus:ring-orange-400"
              />
              <Button
                onClick={() => handleSendMessage()}
                size="sm"
                className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
