import React, {useEffect, useRef, useState } from 'react';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';

type ExampleProps = {
  text: string;
  colors: string[];
  showControls: boolean;
};

export interface WordData {
  text: string;
  value: number;
}


function wordFreq(text: string): WordData[] {
  const words: string[] = text.replace(/\./g, '').split(/\s/);
  const freqMap: Record<string, number> = {};

  for (const w of words) {
    if (!freqMap[w]) freqMap[w] = 0;
    freqMap[w] += 1;
  }
  return Object.keys(freqMap).map((word) => ({ text: word, value: freqMap[word] }));
}

function getRotationDegree() {
  const rand = Math.random();
  const degree = rand > 0.5 ? 60 : -60;
  return rand * degree;
}

type SpiralType = 'archimedean' | 'rectangular';

export default function WordCloud({ text, colors, showControls }: ExampleProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const [spiralType, setSpiralType] = useState<SpiralType>("archimedean");
  const [withRotation, setWithRotation] = useState(false);
  const [words, setWords] = useState<WordData[]>(wordFreq(text));

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const fontScale = scaleLog({
    domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
    range: [dimensions.width * 0.015, dimensions.width * 0.075],
  });

  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);
  const fixedValueGenerator = () => 0.5;

  if (!text || !colors) return null;

  return (
    <div ref={containerRef} className="w-full h-full">
      <Wordcloud
        words={words}
        width={dimensions.width}
        height={dimensions.height}
        fontSize={fontSizeSetter}
        font={"Impact"}
        padding={2}
        spiral={spiralType}
        rotate={withRotation ? getRotationDegree : 0}
        random={fixedValueGenerator}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor={"middle"}
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
      {showControls && (
        <div>
          <label>
            Spiral type &nbsp;
            <select onChange={(e) => setSpiralType(e.target.value as SpiralType)} value={spiralType}>
              <option value={"archimedean"}>archimedean</option>
              <option value={"rectangular"}>rectangular</option>
            </select>
          </label>
          <label>
            With rotation &nbsp;
            <input type="checkbox" checked={withRotation} onChange={() => setWithRotation(!withRotation)} />
          </label>
        </div>
      )}
      <style jsx>{`
        .wordcloud {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          user-select: none;
        }
        .wordcloud svg {
          margin: 1rem 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}