import Camera from '@/components/Camera';
import { useFaceDetection } from '@/hooks/FaceHooks';
import { useEffect, useRef } from 'react';

const DetectFace = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { detection, getDescriptors } = useFaceDetection();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const detectFace = async () => {
      try {
        await getDescriptors(videoRef); // Start detecting faces

        timer = setTimeout(detectFace, 100); // Schedule the next detection
      } catch (error) {}
    };

    // Initialize the video feed and start detection
    const startDetection = async () => {
      try {
        if (videoRef.current) {
          // Wait for the video element to be ready
          await new Promise<void>((resolve) => {
            if (videoRef.current!.readyState >= 2) {
              console.log('first');
              resolve();
            } else {
              videoRef.current!.oncanplay = () => {
                console.log('secoind');
                resolve();
              };
            }
          });
          detectFace(); // Start the detection loop
        }
      } catch (error) {
        console.error('Error initializing video feed:', error);
      }
    };

    startDetection();

    // Cleanup on unmount
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  console.log('descriptors', detection);

  return (
    <div>
      <Camera ref={videoRef} width={800} height={480} />
      {detection && (
        <div
          style={{
            position: 'absolute',
            top: detection.box.y,
            left: detection.box.x,
            width: detection.box.width,
            height: detection.box.height,
            border: '2px solid red',
            pointerEvents: 'none',
          }}
        ></div>
      )}
    </div>
  );
};

export default DetectFace;
