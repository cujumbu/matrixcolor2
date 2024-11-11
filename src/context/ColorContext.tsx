import React, { createContext, useContext, useState } from 'react';

interface ColorContextType {
  matrix: number[][];
  updateMatrix: (newMatrix: number[][]) => void;
  resetMatrix: () => void;
  transposeMatrix: () => void;
  applyPreset: (preset: MatrixPreset) => void;
}

export type MatrixPreset = 
  | 'identity' 
  | 'grayscale' 
  | 'sepia' 
  | 'invert'
  | 'vintage'
  | 'polaroid'
  | 'cyberpunk'
  | 'dramatic'
  | 'nightvision'
  | 'underwater';

const PRESET_MATRICES: Record<MatrixPreset, number[][]> = {
  identity: [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ],
  grayscale: [
    [0.299, 0.587, 0.114, 0],
    [0.299, 0.587, 0.114, 0],
    [0.299, 0.587, 0.114, 0],
    [0, 0, 0, 1],
  ],
  sepia: [
    [0.393, 0.769, 0.189, 0],
    [0.349, 0.686, 0.168, 0],
    [0.272, 0.534, 0.131, 0],
    [0, 0, 0, 1],
  ],
  invert: [
    [-1, 0, 0, 1],
    [0, -1, 0, 1],
    [0, 0, -1, 1],
    [0, 0, 0, 1],
  ],
  vintage: [
    [0.9, 0.5, 0.1, 0],
    [0.3, 0.8, 0.1, 0],
    [0.2, 0.3, 0.5, 0],
    [0, 0, 0, 1],
  ],
  polaroid: [
    [1.438, -0.062, -0.062, 0],
    [-0.122, 1.378, -0.122, 0],
    [-0.016, -0.016, 1.483, 0],
    [0, 0, 0, 1],
  ],
  cyberpunk: [
    [1.1, -0.3, 0.5, 0],
    [0.2, 0.9, 0.3, 0],
    [0.5, 0.2, 1.5, 0],
    [0, 0, 0, 1],
  ],
  dramatic: [
    [2.1, -0.4, -0.4, 0],
    [-0.4, 2.1, -0.4, 0],
    [-0.4, -0.4, 2.1, 0],
    [0, 0, 0, 1],
  ],
  nightvision: [
    [0.1, 0.4, 0, 0],
    [0.3, 1.2, 0.2, 0],
    [0, 0.3, 0.1, 0],
    [0, 0, 0, 1],
  ],
  underwater: [
    [0.8, 0.1, 0.3, 0],
    [0.1, 0.8, 0.3, 0],
    [0.3, 0.3, 1.2, 0],
    [0, 0, 0, 1],
  ],
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [matrix, setMatrix] = useState<number[][]>(PRESET_MATRICES.identity);

  const updateMatrix = (newMatrix: number[][]) => {
    setMatrix(newMatrix);
  };

  const resetMatrix = () => {
    setMatrix(PRESET_MATRICES.identity);
  };

  const transposeMatrix = () => {
    const newMatrix = matrix.map((row, i) =>
      row.map((_, j) => matrix[j][i])
    );
    setMatrix(newMatrix);
  };

  const applyPreset = (preset: MatrixPreset) => {
    setMatrix(PRESET_MATRICES[preset]);
  };

  return (
    <ColorContext.Provider value={{ 
      matrix, 
      updateMatrix, 
      resetMatrix, 
      transposeMatrix,
      applyPreset 
    }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColorContext() {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColorContext must be used within a ColorProvider');
  }
  return context;
}