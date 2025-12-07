export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-800 dark:text-white">
            Coops Hello World
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Welcome to your new landing page. This is where your journey begins.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors cursor-pointer">
            Get Started
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Ready to build something amazing?
          </div>
        </div>
      </div>
    </div>
  );
}


