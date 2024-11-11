import React from 'react';
import { useColorContext } from '../context/ColorContext';
import type { MatrixPreset } from '../context/ColorContext';
import { Sparkles, Sun, Moon, Waves, Zap, Camera } from 'lucide-react';

export function Presets() {
  const { applyPreset } = useColorContext();

  const presets: { id: MatrixPreset; name: string; icon: React.ReactNode; description: string }[] = [
    { 
      id: 'identity', 
      name: 'Normal',
      icon: <Sun className="w-4 h-4" />,
      description: 'Reset to original colors'
    },
    { 
      id: 'grayscale', 
      name: 'Grayscale',
      icon: <Moon className="w-4 h-4" />,
      description: 'Classic black and white'
    },
    { 
      id: 'sepia', 
      name: 'Sepia',
      icon: <Camera className="w-4 h-4" />,
      description: 'Vintage brown tones'
    },
    { 
      id: 'vintage', 
      name: 'Vintage',
      icon: <Camera className="w-4 h-4" />,
      description: 'Faded retro look'
    },
    { 
      id: 'polaroid', 
      name: 'Polaroid',
      icon: <Camera className="w-4 h-4" />,
      description: 'Classic instant photo'
    },
    { 
      id: 'cyberpunk', 
      name: 'Cyberpunk',
      icon: <Zap className="w-4 h-4" />,
      description: 'Neon-futuristic style'
    },
    { 
      id: 'dramatic', 
      name: 'Dramatic',
      icon: <Sparkles className="w-4 h-4" />,
      description: 'High contrast dramatic'
    },
    { 
      id: 'nightvision', 
      name: 'Night Vision',
      icon: <Moon className="w-4 h-4" />,
      description: 'Green night vision effect'
    },
    { 
      id: 'underwater', 
      name: 'Underwater',
      icon: <Waves className="w-4 h-4" />,
      description: 'Deep sea blue tones'
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Presets</h2>
      <div className="grid grid-cols-2 gap-4">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => applyPreset(preset.id)}
            className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors text-gray-800 dark:text-white"
          >
            <div className="flex items-center gap-2 mb-2">
              {preset.icon}
              <span className="font-medium">{preset.name}</span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300">{preset.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}