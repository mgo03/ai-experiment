import {type NextRequest, NextResponse} from 'next/server';
import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

type RequestBody = {requests: [{image: {content: string}; features: string[]}]};

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function POST(req: NextRequest) {
  try {
    const requestBody = (await req.json()) as RequestBody;
    const image = requestBody.requests[0].image.content;

    if (!image) {
      return NextResponse.json(
        {error: '画像データがありません'},
        {status: 400},
      );
    }

    const requests = {
      languageHints: ['ja'],
      image: {
        /* source: {
          filename: image, // パス
        }, */
        content: image, // base64
      },
    };

    const [result] = await client.textDetection(requests);
    const detections = result.textAnnotations;
    if (detections && detections.length > 0) {
      console.log('detected:', detections[0].description);
      return NextResponse.json({text: detections[0].description});
    } else {
      return NextResponse.json({text: ''});
    }
  } catch {
    return NextResponse.json({text: 'OCR処理中にエラーが発生しました。'});
  }
}
