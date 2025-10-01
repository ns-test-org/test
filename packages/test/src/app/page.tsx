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
      case '=':
        return secondValue;
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

  const Button = ({ 
    onClick, 
    className = '', 
    children, 
    variant = 'default' 
  }: { 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode;
    variant?: 'default' | 'operator' | 'equals' | 'clear';
  }) => {
    const baseClasses = 'h-16 rounded-2xl font-semibold text-xl transition-all duration-200 active:scale-95 shadow-lg';
    
    const variantClasses = {
      default: 'bg-gray-700 hover:bg-gray-600 text-white',
      operator: 'bg-orange-500 hover:bg-orange-400 text-white',
      equals: 'bg-orange-500 hover:bg-orange-400 text-white col-span-2',
      clear: 'bg-gray-500 hover:bg-gray-400 text-white'
    };

    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-700 max-w-sm w-full">
        {/* Display */}
        <div className="bg-black rounded-2xl p-6 mb-6 shadow-inner">
          <div className="text-right">
            <div className="text-gray-400 text-sm mb-1">
              {previousValue !== null && operation ? `${previousValue} ${operation}` : ''}
            </div>
            <div className="text-white text-4xl font-light overflow-hidden">
              {display.length > 10 ? parseFloat(display).toExponential(5) : display}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button onClick={clear} variant="clear">
            AC
          </Button>
          <Button onClick={() => setDisplay(display.slice(0, -1) || '0')} variant="clear">
            ⌫
          </Button>
          <Button onClick={() => performOperation('÷')} variant="operator">
            ÷
          </Button>
          <Button onClick={() => performOperation('×')} variant="operator">
            ×
          </Button>

          {/* Row 2 */}
          <Button onClick={() => inputNumber('7')}>
            7
          </Button>
          <Button onClick={() => inputNumber('8')}>
            8
          </Button>
          <Button onClick={() => inputNumber('9')}>
            9
          </Button>
          <Button onClick={() => performOperation('-')} variant="operator">
            −
          </Button>

          {/* Row 3 */}
          <Button onClick={() => inputNumber('4')}>
            4
          </Button>
          <Button onClick={() => inputNumber('5')}>
            5
          </Button>
          <Button onClick={() => inputNumber('6')}>
            6
          </Button>
          <Button onClick={() => performOperation('+')} variant="operator">
            +
          </Button>

          {/* Row 4 */}
          <Button onClick={() => inputNumber('1')}>
            1
          </Button>
          <Button onClick={() => inputNumber('2')}>
            2
          </Button>
          <Button onClick={() => inputNumber('3')}>
            3
          </Button>
          <Button onClick={handleEquals} variant="equals" className="row-span-2">
            =
          </Button>

          {/* Row 5 */}
          <Button onClick={() => inputNumber('0')} className="col-span-2">
            0
          </Button>
          <Button onClick={inputDecimal}>
            .
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          Beautiful Calculator
        </div>
      </div>
    </div>
  );
}

