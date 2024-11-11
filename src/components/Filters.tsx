import React from 'react';
import { useColorContext } from '../context/ColorContext';

export function Filters() {
  const { updateMatrix } = useColorContext();

  const handleBrightnessChange = (value: number) => {
    const v = value / 100;
    updateMatrix([
      [v, 0, 0, 0],
      [0, v, 0, 0],
      [0, 0, v, 0],
      [0, 0, 0, 1],
    ]);
  };

  const handleContrastChange = (value: number) => {
    const v = value / 100;
    const o = -0.5 * v + 0.5;
    updateMatrix([
      [v, 0, 0, o],
      [0, v, 0, o],
      [0, 0, v, o],
      [0, 0, 0, 1],
    ]);
  };

  const handleSaturationChange = (value: number) => {
    const v = value / 100;
    const lumR = 0.3086;
    const lumG = 0.6094;
    const lumB = 0.0820;
    
    const sr = (1 - v) * lumR + v;
    const sg = (1 - v) * lumG + v;
    const sb = (1 - v) * lumB + v;
    
    updateMatrix([
      [sr, sg - v * lumG, sb - v * lumB, 0],
      [sr - v * lumR, sg, sb - v * lumB, 0],
      [sr - v * lumR, sg - v * lumG, sb, 0],
      [0, 0, 0, 1],
    ]);
  };

  const handleHueRotateChange = (value: number) => {
    const angle = (value * Math.PI) / 180;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    
    updateMatrix([
      [
        0.213 + cos * 0.787 - sin * 0.213,
        0.213 - cos * 0.213 + sin * 0.143,
        0.213 - cos * 0.213 - sin * 0.787,
        0,
      ],
      [
        0.715 - cos * 0.715 - sin * 0.715,
        0.715 + cos * 0.285 + sin * 0.140,
        0.715 - cos * 0.715 + sin * 0.715,
        0,
      ],
      [
        0.072 - cos * 0.072 + sin * 0.928,
        0.072 - cos * 0.072 - sin * 0.283,
        0.072 + cos * 0.928 + sin * 0.072,
        0,
      ],
      [0, 0, 0, 1],
    ]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Filters</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Brightness
          </label>
          <input
            type="range"
            min="0"
            max="200"
            defaultValue="100"
            onChange={(e) => handleBrightnessChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Contrast
          </label>
          <input
            type="range"
            min="0"
            max="200"
            defaultValue="100"
            onChange={(e) => handleContrastChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Saturation
          </label>
          <input
            type="range"
            min="0"
            max="200"
            defaultValue="100"
            onChange={(e) => handleSaturationChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Hue Rotate
          </label>
          <input
            type="range"
            min="0"
            max="360"
            defaultValue="0"
            onChange={(e) => handleHueRotateChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>
    </div>
  );
}