import React from 'react';
import { Layout } from './components/Layout';
import { MatrixEditor } from './components/MatrixEditor';
import { ImagePreview } from './components/ImagePreview';
import { ColorProvider } from './context/ColorContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/Tabs';
import { Guide } from './components/Guide';
import { Wand2 } from 'lucide-react';
import { Presets } from './components/Presets';
import { Filters } from './components/Filters';
import { Export } from './components/Export';
import { ColorSpaces } from './components/ColorSpaces';

export function App() {
  return (
    <ColorProvider>
      <Layout>
        <header className="w-full bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Wand2 className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">MatrixColor.com</h1>
                <p className="mt-2 text-purple-100 text-lg">Professional Color Matrix Transformation Studio</p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Tabs defaultValue="matrix" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="matrix">Matrix</TabsTrigger>
                  <TabsTrigger value="presets">Presets</TabsTrigger>
                  <TabsTrigger value="filters">Filters</TabsTrigger>
                  <TabsTrigger value="colorspaces">Color Spaces</TabsTrigger>
                  <TabsTrigger value="export">Export</TabsTrigger>
                </TabsList>
                
                <TabsContent value="matrix">
                  <MatrixEditor />
                </TabsContent>
                
                <TabsContent value="presets">
                  <Presets />
                </TabsContent>
                
                <TabsContent value="filters">
                  <Filters />
                </TabsContent>

                <TabsContent value="colorspaces">
                  <ColorSpaces />
                </TabsContent>

                <TabsContent value="export">
                  <Export />
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <ImagePreview />
            </div>
          </div>

          <Guide />
        </main>
      </Layout>
    </ColorProvider>
  );
}