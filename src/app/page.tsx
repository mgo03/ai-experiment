'use client';
import Dropzone from '@/components/Dropzone';
import Result from '@/components/Results';

const Home: () => React.JSX.Element = () => {
  return (
    <>
      <div className="m-10">
        <h1 className="text-2xl">画像OCR</h1>
      </div>
      <Dropzone />

      <div className="m-10">
        <Result ocrResult="hoge" />
      </div>
    </>
  );
};

export default Home;
