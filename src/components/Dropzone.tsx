'use client';
import Image from 'next/image';
import React, {useCallback, useContext, useState} from 'react';
import {useDragAndDrop} from '@/hooks/useDragAndDrop';
import {useOcr} from '@/hooks/useOcr';
import {OcrResultContext} from '@/hooks/useOcrResultContext';

type DropzoneProps = {};

const Dropzone = (props: DropzoneProps) => {
  const {setOcrResult} = useContext(OcrResultContext);
  const {handleOcr} = useOcr();
  const {imageSrc, isDragOver, handleDragEnter, handleDragLeave, handleDrop} =
    useDragAndDrop();

  const onOcrProcess = useCallback(async () => {
    if (!imageSrc) return;

    const result = await handleOcr(imageSrc);
    setOcrResult(result);
  }, [imageSrc, handleOcr, setOcrResult]);

  return (
    <>
      <div className="flex justify-center">
        {imageSrc ? (
          <Image
            src={imageSrc}
            width={0}
            height={0}
            style={{width: '40%', height: 'auto'}}
            alt="画像のプレビュー"
          />
        ) : (
          <div
            className="w-10/12 p-20 text-center"
            style={{
              border: isDragOver ? '2px dashed #4A90E2' : '2px dashed #ccc',
              transition: 'border 0.3s',
            }}
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p>
              {isDragOver
                ? 'ファイルをここにドロップ'
                : 'ファイルをドラッグ＆ドロップするか、クリックして選択'}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end mr-10">
        <button
          type="button"
          className="bg-blue-500 rounded-md text-white px-4 py-2 mt-5"
          onClick={async () => {
            await onOcrProcess();
          }}
        >
          OCR処理をする
        </button>
      </div>
    </>
  );
};

export default Dropzone;
