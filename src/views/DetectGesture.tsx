import Camera from '@/components/Camera';
import { useGestureRecognition } from '@/hooks/GestureHooks';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { useRef } from 'react';

const DetectGesture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { gesture } = useGestureRecognition(videoRef);

  console.log('detected gesture:', gesture);

  return (
    <>
      <section className="w-full">
        <Camera ref={videoRef} width={800} height={480} />
      </section>
      <section className="w-full">
        <div className="absolute top-24 left-0 p-4 bg-stone-900">
          <p>
            faceName: 'jotain' &nbsp;
            {gesture === 'Thumb_Up' && <ThumbsUpIcon className="inline" />}
            {gesture === 'Thumb_Down' && <ThumbsDownIcon className="inline" />}
          </p>
          <p>
            {gesture ? (
              <p>Point up to save</p>
            ) : (
              <p>Thumb up or down to vote</p>
            )}
          </p>
        </div>
      </section>
    </>
  );
};

export default DetectGesture;
