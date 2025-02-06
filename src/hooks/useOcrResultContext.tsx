import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useMemo,
  useState,
} from 'react';

type OcrResultContextObject = {
  readonly ocrResult: string | null;
  readonly setOcrResult: Dispatch<SetStateAction<string | null>>;
};

type Props = {
  readonly children: ReactNode;
};

export const OcrResultContext = createContext<OcrResultContextObject>(
  {} as OcrResultContextObject,
);

export const OcrResultContextProvider = (props: Props) => {
  const [ocrResult, setOcrResult] = useState<string | null>(null);

  const value = useMemo(() => {
    return {
      ocrResult,
      setOcrResult,
    };
  }, [ocrResult, setOcrResult]);

  return (
    <OcrResultContext.Provider value={value}>
      {props.children}
    </OcrResultContext.Provider>
  );
};
