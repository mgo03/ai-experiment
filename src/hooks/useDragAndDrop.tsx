import {useState, useCallback} from 'react';

export const useDragAndDrop = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDragEnter = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
        console.log('ファイルをドラッグ中');
        setIsDragOver(true);
      }
    },
    [],
  );

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    if (
      event.dataTransfer.files !== null &&
      event.dataTransfer.files.length > 0
    ) {
      if (event.dataTransfer.files.length === 1) {
        onDropFile(event.dataTransfer.files[0]);
        console.log('ファイルをドロップ');
      } else {
        console.log('ファイルは１個まで！');
      }

      event.dataTransfer.clearData();
    }
  }, []);

  // ファイルをドロップ
  const onDropFile = (file: File) => {
    if (file.type.startsWith('image')) {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        const imageSrc = fileReader.result as string;
        setImageSrc(imageSrc);
      });
      fileReader.readAsDataURL(file);
    } else {
      console.log('画像ファイルを選択してください');
    }
  };

  return {
    imageSrc,
    setImageSrc,
    isDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  };
};
