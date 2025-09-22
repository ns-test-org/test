'use client';

import { useState, useEffect, useRef } from 'react';

interface TerminalProps {
  className?: string;
}

export default function Terminal({ className = '' }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    '$ Welcome to Hello World Terminal!',
    '$ Type "hello" to see a greeting, "clear" to clear the screen, or "help" for commands.',
    ''
  ]);
  const [currentLine, setCurrentLine] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    let output = '';

    switch (cmd) {
      case 'hello':
        output = 'Hello, World! 🌍 Welcome to the terminal!';
        break;
      case 'help':
        output = 'Available commands:\n  hello - Display hello world message\n  clear - Clear the terminal\n  date - Show current date and time\n  help - Show this help message';
        break;
      case 'clear':
        setHistory(['$ Welcome to Hello World Terminal!', '']);
        setCurrentLine('');
        return;
      case 'date':
        output = new Date().toLocaleString();
        break;
      case '':
        break;
      default:
        output = `Command not found: ${command}. Type "help" for available commands.`;
    }

    const newHistory = [...history];
    newHistory.push(`$ ${command}`);
    if (output) {
      output.split('\n').forEach(line => newHistory.push(line));
    }
    newHistory.push('');
    
    setHistory(newHistory);
    setCurrentLine('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className={`bg-black text-green-400 font-mono text-sm p-4 rounded-lg border border-gray-700 shadow-lg ${className}`}
      onClick={handleTerminalClick}
    >
      <div className="flex items-center mb-2 text-gray-400">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="ml-4 text-xs">Hello World Terminal</div>
      </div>
      
      <div 
        ref={terminalRef}
        className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        
        <div className="flex items-center">
          <span className="text-green-400">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-transparent border-none outline-none flex-1 text-green-400 ml-1"
            placeholder="Type a command..."
            autoFocus
          />
          <span className="animate-pulse">|</span>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        Press Enter to execute commands. Click anywhere in the terminal to focus.
      </div>
    </div>
  );
}
