import React, { useState, useCallback, useEffect } from 'react';
import { NumberCircle } from './components/NumberCircle';
import { PlaceholderCircle } from './components/PlaceholderCircle';
import { SparklesIcon, HistoryIcon } from './components/icons';

const App: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [history, setHistory] = useState<number[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('luckyNumberHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

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
      setHistory(prev => {
        const newHistory = [sortedNumbers, ...prev].slice(0, 10); // Keep last 10 entries
        localStorage.setItem('luckyNumberHistory', JSON.stringify(newHistory));
        return newHistory;
      });
      setIsLoading(false);
    }, 1200); // A bit longer delay to enjoy the loading animation
  }, []);

  return (
    <div className="flex flex-col min-h-screen antialiased text-white bg-gray-900 overflow-hidden">
      {/* Mobile-optimized header with safe area */}
      <header className="pt-safe pt-4 sm:pt-8 pb-6 px-4 text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 leading-tight">
          Lucky Number Generator
        </h1>
        <p className="mt-3 text-sm sm:text-lg text-gray-400 px-2">
          Press the button to reveal your lucky trio!
        </p>
      </header>

      {/* Main content area with mobile-first spacing */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-8">
        {/* Numbers container with mobile-optimized spacing */}
        <div className="flex justify-center items-center w-full mb-12 sm:mb-16">
          <div className="flex justify-center items-center space-x-2 sm:space-x-4 md:space-x-6">
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
        </div>

        {/* History display */}
        {history.length > 0 && (
          <div className="w-full max-w-md mt-8 px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-300 flex items-center">
                <HistoryIcon className="w-5 h-5 mr-2" />
                Previous Numbers
              </h2>
              <button
                onClick={() => {
                  setHistory([]);
                  localStorage.removeItem('luckyNumberHistory');
                }}
                className="text-xs text-pink-400 hover:text-pink-300 transition-colors"
              >
                Clear history
              </button>
            </div>
            <div className="space-y-3">
              {history.map((set, i) => (
                <div key={i} className="flex justify-center space-x-2">
                  {set.map((num, j) => (
                    <div
                      key={`${i}-${j}`}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 text-sm font-medium"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile-optimized button */}
        <div className="w-full max-w-xs sm:max-w-sm px-4">
          <button
            onClick={generateNumbers}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-base sm:text-lg rounded-full shadow-lg hover:scale-105 active:scale-95 transform transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 touch-manipulation"
          >
            {isLoading ? (
              <span className="flex items-center">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-3"></div>
                Generating...
              </span>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                <span>Generate Numbers</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile hint text */}
        <p className="mt-6 text-xs sm:text-sm text-gray-500 text-center px-4 sm:hidden">
          Tap the button above to generate your lucky numbers
        </p>
      </main>

      {/* Footer with safe area for mobile */}
      <footer className="pb-safe pb-4 sm:pb-6 px-4 text-center">
        <p className="text-xs sm:text-sm text-gray-600">
          Good luck! 🍀
        </p>
      </footer>
    </div>
  );
};

export default App;