import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  aspectHeight: number;
  aspectWidth: number;
  children: ReactNode;
}

/**
 * 親要素の横幅を基準にして、指定したアスペクト比のブロック要素を作ります
 */
export const AspectRatioBox = ({ aspectHeight, aspectWidth, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [clientHeight, setClientHeight] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (node == null) {
      return;
    }

    // clientWidth とアスペクト比から clientHeight を計算する
    const calcStyle = () => {
      const clientWidth = node.clientWidth;
      setClientHeight((clientWidth / aspectWidth) * aspectHeight);
    };

    calcStyle();

    const observer = new ResizeObserver(calcStyle);
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [aspectHeight, aspectWidth]);

  return (
    <div ref={ref} className="relative h-1 w-full" style={{ height: clientHeight }}>
      {/* 高さが計算できるまで render しない */}
      {clientHeight !== 0 ? <div className="absolute inset-0">{children}</div> : null}
    </div>
  );
};
