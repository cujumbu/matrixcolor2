import React, { useRef, useEffect, useState } from 'react';
import { useColorContext } from '../context/ColorContext';
import { Upload, RefreshCw, Image as ImageIcon, Download } from 'lucide-react';

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1461696114087-397271a7aedc?auto=format&fit=crop&w=800&q=80',
];

export function ImagePreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { matrix } = useColorContext();
  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGES[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setLoading(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        data[i] = r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2] + a * matrix[0][3];
        data[i + 1] = r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2] + a * matrix[1][3];
        data[i + 2] = r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2] + a * matrix[2][3];
        data[i + 3] = r * matrix[3][0] + g * matrix[3][1] + b * matrix[3][2] + a * matrix[3][3];
      }

      ctx.putImageData(imageData, 0, 0);
      setLoading(false);
    };
  }, [matrix, imageUrl]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const cycleDefaultImage = () => {
    const currentIndex = DEFAULT_IMAGES.indexOf(imageUrl);
    const nextIndex = (currentIndex + 1) % DEFAULT_IMAGES.length;
    setImageUrl(DEFAULT_IMAGES[nextIndex]);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary link element
    const link = document.createElement('a');
    link.download = 'transformed-image.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Preview</h2>
        <div className="flex gap-2">
          <button
            onClick={cycleDefaultImage}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Change Image
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer">
            <Upload className="w-4 h-4" />
            Upload
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
          <button
            onClick={downloadImage}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            disabled={loading}
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <RefreshCw className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
