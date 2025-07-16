import React, { useState, useCallback } from 'react';
import { NumberCircle } from './components/NumberCircle';
import { PlaceholderCircle } from './components/PlaceholderCircle';
import { SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateNumbers = useCallback(() => {
    setIsLoading(true);
    setNumbers([]); // Clear previous numbers to hide them

    // Simulate network delay and processing for better UX
    setTimeout(() => {
      const uniqueNumbers = new Set<number>();
      while (uniqueNumbers.size < 3) {
        const randomNumber = Math.floor(Math.random() * 50) + 1;
        uniqueNumbers.add(randomNumber);
      }
      const sortedNumbers = Array.from(uniqueNumbers).sort((a, b) => a - b);
      setNumbers(sortedNumbers);
      setIsLoading(false);
    }, 1200); // A bit longer delay to enjoy the loading animation
  }, []);

  return (
    <div className="flex flex-col min-h-screen antialiased text-white bg-gray-900">
      <header className="pt-8 sm:pt-16 pb-4 sm:pb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 sm:text-5xl">
          Lucky Number Generator
        </h1>
        <p className="mt-2 text-lg text-gray-400">Press the button to reveal your lucky trio!</p>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center space-y-12 sm:space-y-16 p-4">
        <div className="flex justify-center items-center w-full h-48 space-x-4 sm:space-x-6">
          {isLoading ? (
            <>
              <PlaceholderCircle index={0} />
              <PlaceholderCircle index={1} />
              <PlaceholderCircle index={2} />
            </>
          ) : (
            numbers.map((num, index) => (
              <NumberCircle key={`${num}-${index}`} number={num} index={index} />
            ))
          )}
        </div>

        <button
          onClick={generateNumbers}
          disabled={isLoading}
          className="w-full max-w-sm flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 active:scale-100 transform transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? (
            'Generating...'
          ) : (
            <>
              <SparklesIcon className="w-6 h-6 mr-3" />
              <span>Generate Numbers</span>
            </>
          )}
        </button>
      </main>

      <footer className="p-6">
        
      </footer>
    </div>
  );
};

export default App;