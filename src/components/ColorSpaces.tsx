import React from 'react';
import { useColorContext } from '../context/ColorContext';
import { Palette } from 'lucide-react';

export function ColorSpaces() {
  const { updateMatrix } = useColorContext();

  const colorSpaces = [
    {
      name: 'RGB to YUV (BT.601)',
      transform: () => updateMatrix([
        [0.299, 0.587, 0.114, 0],
        [-0.14713, -0.28886, 0.436, 0],
        [0.615, -0.51499, -0.10001, 0],
        [0, 0, 0, 1],
      ]),
    },
    {
      name: 'RGB to YUV (BT.709)',
      transform: () => updateMatrix([
        [0.2126, 0.7152, 0.0722, 0],
        [-0.09991, -0.33609, 0.436, 0],
        [0.615, -0.55861, -0.05639, 0],
        [0, 0, 0, 1],
      ]),
    },
    {
      name: 'RGB to YCbCr',
      transform: () => updateMatrix([
        [0.299, 0.587, 0.114, 0],
        [-0.168736, -0.331264, 0.5, 0],
        [0.5, -0.418688, -0.081312, 0],
        [0, 0, 0, 1],
      ]),
    },
    {
      name: 'RGB to HSL',
      transform: () => updateMatrix([
        [0.299, 0.587, 0.114, 0],
        [0.5, 0, -0.5, 0],
        [-0.25, 0.5, -0.25, 0],
        [0, 0, 0, 1],
      ]),
    },
    {
      name: 'RGB to XYZ',
      transform: () => updateMatrix([
        [0.4124, 0.3576, 0.1805, 0],
        [0.2126, 0.7152, 0.0722, 0],
        [0.0193, 0.1192, 0.9505, 0],
        [0, 0, 0, 1],
      ]),
    },
    {
      name: 'Protanopia',
      transform: () => updateMatrix([
        [0.567, 0.433, 0, 0],
        [0.558, 0.442, 0, 0],
        [0, 0.242, 0.758, 0],
        [0, 0, 0, 1],
      ]),
    },
    {
      name: 'Deuteranopia',
      transform: () => updateMatrix([
        [0.625, 0.375, 0, 0],
        [0.7, 0.3, 0, 0],
        [0, 0.3, 0.7, 0],
        [0, 0, 0, 1],
      ]),
    },
    {
      name: 'Tritanopia',
      transform: () => updateMatrix([
        [0.95, 0.05, 0, 0],
        [0, 0.433, 0.567, 0],
        [0, 0.475, 0.525, 0],
        [0, 0, 0, 1],
      ]),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Color Space Transformations</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {colorSpaces.map((space) => (
          <button
            key={space.name}
            onClick={space.transform}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 group"
          >
            <h3 className="font-medium text-gray-800 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300">
              {space.name}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
}