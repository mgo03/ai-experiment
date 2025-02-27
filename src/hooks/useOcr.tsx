import {useCallback} from 'react';

export const useOcr = () => {
  // ファイルをアップロードしてOCR結果を取得するロジック
  const handleOcr = useCallback(async (imageData: string) => {
    if (!imageData) {
      console.log('画像が読み込まれていません');
      return null;
    }

    try {
      // `data:image/png;base64,`除去
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');

      const requestBody = {
        requests: [
          {
            image: {content: base64Data},
            features: [
              {
                type: 'TEXT_DETECTION',
                // 必要に応じて maxResults: 5 など設定
              },
            ],
          },
        ],
      };

      // Next.js API Route に POST リクエストを送る
      const response = await fetch('/api/ocr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = (await response.json()) as {text: string};
      console.log('OCR結果:', data.text);
      return data.text;
    } catch (error) {
      console.error(error);
      console.log('OCR処理中にエラーが発生しました');
      return null;
    }
  }, []);

  return {
    handleOcr,
  };
};
