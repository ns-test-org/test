'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
            Calculator
          </h1>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-right">
            <div className="text-3xl font-mono text-gray-800 dark:text-white overflow-hidden">
              {display}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={clear}
            className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            Clear
          </button>
          <button
            onClick={() => performOperation('÷')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            ÷
          </button>
          <button
            onClick={() => performOperation('×')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            ×
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputNumber('7')}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            9
          </button>
          <button
            onClick={() => performOperation('-')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            -
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputNumber('4')}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            6
          </button>
          <button
            onClick={() => performOperation('+')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            +
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputNumber('1')}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            3
          </button>
          <button
            onClick={handleEquals}
            className="row-span-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            =
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputNumber('0')}
            className="col-span-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
}

