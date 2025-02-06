'use client';
import React from 'react';

type ResultProps = {
  readonly ocrResult: string | null;
};

const Result = (props: ResultProps) => {
  return (
    <>
      <h2 className="text-xl mb-3">OCR結果</h2>

      {props.ocrResult ? <p>{props.ocrResult}</p> : <p>結果がありません。</p>}
    </>
  );
};

export default Result;
