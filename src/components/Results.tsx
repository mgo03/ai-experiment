'use client';
import React, {useContext} from 'react';
import {OcrResultContext} from '@/hooks/useOcrResultContext';

type ResultProps = {};

const Result = (props: ResultProps) => {
  const {ocrResult} = useContext(OcrResultContext);
  return (
    <>
      <h2 className="text-xl mb-3">OCR結果</h2>

      {ocrResult ? <p>{ocrResult}</p> : <p>結果がありません。</p>}
    </>
  );
};

export default Result;
