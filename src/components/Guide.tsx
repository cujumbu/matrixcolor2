import React from 'react';
import { Book, Info } from 'lucide-react';

export function Guide() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Book className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">How to Use Matrix Master</h2>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Matrix Editor</h3>
          <p className="text-gray-600 dark:text-gray-300">
            The matrix editor allows you to directly manipulate the 4x4 color transformation matrix. Each row represents how the RGBA channels are combined to produce the output color.
          </p>
          <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-300">
            <li>Row 1: Red channel transformation</li>
            <li>Row 2: Green channel transformation</li>
            <li>Row 3: Blue channel transformation</li>
            <li>Row 4: Alpha channel transformation</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Presets</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Choose from common color transformations like grayscale, sepia, or color blindness simulations. Click any preset to instantly apply the transformation.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Filters</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Use interactive sliders to adjust brightness, contrast, saturation, and more. The matrix updates automatically as you adjust the values.
          </p>
        </section>

        <div className="flex items-center gap-2 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <Info className="w-5 h-5 text-purple-600" />
          <p className="text-sm text-purple-700 dark:text-purple-300">
            Changes are applied in real-time to the preview image. You can upload your own image or use the default one.
          </p>
        </div>
      </div>
    </div>
  );
}