'use client';
import Dropzone from '@/components/Dropzone';
import Result from '@/components/Results';
import {OcrResultContextProvider} from '@/hooks/useOcrResultContext';

const Home: () => React.JSX.Element = () => {
  return (
    <OcrResultContextProvider>
      <div className="m-10">
        <h1 className="text-2xl">画像OCR</h1>
      </div>
      <Dropzone />

      <div className="m-10">
        <Result />
      </div>
    </OcrResultContextProvider>
  );
};

export default Home;
