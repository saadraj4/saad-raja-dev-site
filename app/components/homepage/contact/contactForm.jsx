"use client";

import { isValidEmail } from '@/utils/check-email';
import { useState, useTransition } from 'react';
import { TbMailForward } from "react-icons/tb";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isPending, startTransition] = useTransition();
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    message: '',
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    startTransition(async () => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userInput.name,
            email: userInput.email,
            message: userInput.message,
          }),
        });
        console.log("response",response)
        const data = await response.json();
        
        if (response.ok && data.success) {
          toast.success(data.message || 'Message sent successfully!');
          setUserInput({
            name: '',
            email: '',
            message: '',
          });
        } else {
          toast.error(data.message || 'Failed to send message');
        }
      } catch (err) {
        console.error('Send error:', err);
        toast.error('Failed to send message. Please try again.');
      }
    });
  };

  return (
    <div className="bg-white border border-line rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-ink tracking-tight mb-2">
        Send me a message
      </h3>
      <p className="text-xs text-muted leading-relaxed mb-6">
        Have a question or work opportunity? Drop me a line and I&apos;ll get back to you shortly.
      </p>

      <form onSubmit={handleSendMail} className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">
            Your Name
          </label>
          <input
            className="w-full bg-bg-soft border border-line rounded-lg text-ink focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/15 outline-0 transition-all duration-200 px-3.5 py-2.5 text-sm"
            type="text"
            maxLength="100"
            required
            placeholder="John Doe"
            onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
            onBlur={checkRequired}
            value={userInput.name}
            disabled={isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">
            Email Address
          </label>
          <input
            className={`w-full bg-bg-soft border rounded-lg text-ink focus:bg-white focus:ring-2 outline-0 transition-all duration-200 px-3.5 py-2.5 text-sm ${
              error.email 
                ? 'border-red-400 focus:border-red-500 focus:ring-red-100' 
                : 'border-line focus:border-accent focus:ring-accent/15'
            }`}
            type="email"
            maxLength="100"
            required
            placeholder="johndoe@example.com"
            value={userInput.email}
            onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
            onBlur={() => {
              checkRequired();
              setError({ ...error, email: !isValidEmail(userInput.email) });
            }}
            disabled={isPending}
          />
          {error.email && (
            <p className="text-xs text-red-500 font-semibold mt-0.5">Please provide a valid email!</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">
            Your Message
          </label>
          <textarea
            className="w-full bg-bg-soft border border-line rounded-lg text-ink focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/15 outline-0 transition-all duration-200 px-3.5 py-2.5 text-sm"
            maxLength="500"
            name="message"
            required
            placeholder="Hi Saad, I have a project we could collaborate on..."
            onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
            onBlur={checkRequired}
            rows={4}
            value={userInput.message}
            disabled={isPending}
          />
        </div>

        <div className="pt-2 flex flex-col items-center gap-3">
          {error.required && (
            <p className="text-xs text-red-500 font-semibold">
              All fields are required!
            </p>
          )}
          
          <motion.button
            className="btn-primary w-full justify-center !py-3 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            type="submit"
            disabled={isPending}
            whileHover={{ scale: isPending ? 1 : 1.01 }}
            whileTap={{ scale: isPending ? 1 : 0.99 }}
          >
            <span>{isPending ? "Sending..." : "Send Message"}</span>
            {!isPending && <TbMailForward size={16} />}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;