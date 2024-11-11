import React from 'react';
import { useColorContext } from '../context/ColorContext';
import { RotateCw, Undo2 } from 'lucide-react';

export function MatrixEditor() {
  const { matrix, updateMatrix, resetMatrix, transposeMatrix } = useColorContext();

  const handleInputChange = (row: number, col: number, value: string) => {
    const newValue = parseFloat(value) || 0;
    const newMatrix = matrix.map(r => [...r]);
    newMatrix[row][col] = newValue;
    updateMatrix(newMatrix);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Color Transformation Matrix</h2>
      
      <div className="grid grid-cols-4 gap-2">
        {matrix.map((row, i) => (
          row.map((value, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              value={value.toFixed(2)}
              onChange={(e) => handleInputChange(i, j, e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              step="0.1"
            />
          ))
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={resetMatrix}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <Undo2 className="w-4 h-4" />
          Reset
        </button>
        <button
          onClick={transposeMatrix}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          <RotateCw className="w-4 h-4" />
          Transpose
        </button>
      </div>
    </div>
  );
}