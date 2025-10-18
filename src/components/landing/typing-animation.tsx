"use client";

import { useState, useEffect } from 'react';

const words = ["Welcome to GameX", "Play. Learn. Level Up."];

export default function TypingAnimation() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    let timeout: NodeJS.Timeout;

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
      if (text.length < words[index].length) {
        timeout = setTimeout(() => {
          setText(t => t + words[index].charAt(t.length));
        }, 120); // Typing speed
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Pause after typing
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <h1 className="text-4xl font-bold tracking-tight text-green-900 sm:text-5xl md:text-6xl font-headline h-20 sm:h-24">
      <span>{text}</span>
      <span className="border-r-4 border-primary animate-blink-caret ml-1" aria-hidden="true" />
    </h1>
  );
}
