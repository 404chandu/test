"use client";

import { useState, useEffect } from 'react';

export default function TypingAnimation({ words = ["Welcome to GameX", "Play. Learn. Level Up."]}: { words?: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentWord = words[index];

    if (isDeleting) {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(t => t.slice(0, -1));
        }, 80); // Deleting speed
      } else {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    } else {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText(t => t + currentWord.charAt(t.length));
        }, 120); // Typing speed
      } else {
        if (words.length > 1) {
            timeout = setTimeout(() => {
                setIsDeleting(true);
            }, 2000); // Pause after typing
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, words]);

  return (
    <h1 className="text-4xl font-bold tracking-tight text-green-900 sm:text-5xl md:text-6xl font-headline h-20 sm:h-24">
      <span>{text}</span>
      <span className="border-r-4 border-primary animate-blink-caret ml-1" aria-hidden="true" />
    </h1>
  );
}
