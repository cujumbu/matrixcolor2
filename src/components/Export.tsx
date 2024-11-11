import React from 'react';
import { useColorContext } from '../context/ColorContext';
import { Code2, Copy, Download } from 'lucide-react';

export function Export() {
  const { matrix } = useColorContext();

  const formats = {
    css: `filter: matrix3d(${matrix.flat().join(', ')});`,
    svg: `<feColorMatrix type="matrix" values="${matrix.flat().join(' ')}"/>`,
    webgl: `mat4 colorMatrix = mat4(\n${matrix
      .map((row) => '  ' + row.join(', '))
      .join(',\n')}\n);`,
    json: JSON.stringify(matrix, null, 2),
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadMatrix = () => {
    const blob = new Blob([formats.json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-matrix.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Code2 className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Export Matrix</h2>
      </div>

      <div className="space-y-6">
        {Object.entries(formats).map(([format, value]) => (
          <div key={format} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 uppercase">
                {format}
              </h3>
              <button
                onClick={() => copyToClipboard(value)}
                className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <pre className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg overflow-x-auto text-sm">
              <code>{value}</code>
            </pre>
          </div>
        ))}

        <button
          onClick={downloadMatrix}
          className="w-full flex items-center justify-center gap-2 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Matrix
        </button>
      </div>
    </div>
  );
}