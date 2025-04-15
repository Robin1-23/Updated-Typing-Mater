


import PropTypes from 'prop-types';
import { FaCheckCircle, FaTimesCircle, FaPercentage, FaTachometerAlt } from 'react-icons/fa';

function Result({ correctWords, wrongWords, accuracy, speed, takeTest }) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-neutral-900 text-white p-6"
    
    style={{
      backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(6,182,212,0.2) 0.5px, transparent 0)`,
      backgroundSize:"8px 8px",
      backgroundRepeat:"repeat"
    }}
    
    >
      
      {/* Dashboard Card */}
      <div className="bg-gray-800/80 backdrop-blur-md shadow-lg rounded-xl p-8 w-full max-w-lg text-center">
        
        <h2 className="text-3xl font-bold text-gray-100 mb-4 tracking-wide font-mono scale-125">Typing Test Results</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Correct Words */}
          <div className="flex flex-col items-center p-4 bg-gray-700 rounded-lg shadow-md">
            <FaCheckCircle className="text-green-400 text-4xl mb-2" />
            <p className="text-lg font-medium">Correct Words</p>
            <span className="text-2xl font-bold text-green-300">{correctWords}</span>
          </div>

          {/* Wrong Words */}
          <div className="flex flex-col items-center p-4 bg-gray-700 rounded-lg shadow-md">
            <FaTimesCircle className="text-red-400 text-4xl mb-2" />
            <p className="text-lg font-medium">Wrong Words</p>
            <span className="text-2xl font-bold text-red-300">{wrongWords}</span>
          </div>

          {/* Accuracy */}
          <div className="flex flex-col items-center p-4 bg-gray-700 rounded-lg shadow-md">
            <FaPercentage className="text-blue-400 text-4xl mb-2" />
            <p className="text-lg font-medium">Accuracy</p>
            <span className="text-2xl font-bold text-blue-300">{accuracy}%</span>
          </div>

          {/* Speed */}
          <div className="flex flex-col items-center p-4 bg-gray-700 rounded-lg shadow-md">
            <FaTachometerAlt className="text-yellow-400 text-4xl mb-2" />
            <p className="text-lg font-medium">Speed</p>
            <span className="text-2xl font-bold text-yellow-300">{speed} WPM</span>
          </div>
        </div>

        {/* Restart Button */}
        <button
          onClick={takeTest}
          className="mt-8 px-6 py-3 text-lg font-semibold rounded-lg bg-green-500 hover:bg-green-600 transition-all duration-300 shadow-md"
        >
          🔄 Take Test Again 
        </button>
      </div>

    </div>
  );
}

/* ✅ Define PropTypes for Validation */
Result.propTypes = {
  correctWords: PropTypes.number.isRequired,
  wrongWords: PropTypes.number.isRequired,
  accuracy: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  takeTest: PropTypes.func.isRequired,
};

export default Result;






