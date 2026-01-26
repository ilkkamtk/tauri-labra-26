import Camera from '@/components/Camera';
import { ThumbsUpIcon } from 'lucide-react';
import { useRef } from 'react';

const DetectGesture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <section className="w-full">
        <Camera ref={videoRef} width={800} height={480} />
      </section>
      <section className="w-full">
        <div className="absolute top-24 left-0 p-4 bg-stone-900">
          <p>
            faceName: 'jotain' &nbsp; <ThumbsUpIcon />
          </p>
          <p>Ohjeet</p>
        </div>
      </section>
    </>
  );
};

export default DetectGesture;
