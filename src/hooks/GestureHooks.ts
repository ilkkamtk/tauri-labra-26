import { useEffect, useRef, useState } from 'react';
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';

const useGestureRecognition = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
) => {
  const [gesture, setGesture] = useState<string>('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null); // Timer for frame processing

  useEffect(() => {
    let gestureRecognizer: GestureRecognizer | null = null;

    // Initialize the GestureRecognizer
    const initializeGestureRecognizer = async () => {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks('/wasm');
        gestureRecognizer = await GestureRecognizer.createFromOptions(
          filesetResolver,
          {
            baseOptions: {
              modelAssetPath: '/models/gesture_recognizer.task',
              delegate: 'GPU',
            },
            runningMode: 'VIDEO',
            numHands: 1,
          },
        );
      } catch (error) {
        console.error('Error initializing GestureRecognizer:', error);
      }
    };

    // Process video frames for gesture detection
    const processVideoFrames = async () => {
      if (videoRef && videoRef.current && gestureRecognizer) {
        const nowInMs = Date.now();
        const results = gestureRecognizer.recognizeForVideo(
          videoRef.current,
          nowInMs,
        );

        // Update gesture state
        if (results.gestures.length > 0) {
          const detectedGesture =
            results.gestures[0][0]?.categoryName || 'No gesture detected';
          setGesture(detectedGesture);
        }
      }
      timer.current = setTimeout(processVideoFrames, 100); // Process frames periodically
    };

    // Main initialization function
    const main = async () => {
      if (videoRef) {
        try {
          if (!videoRef.current) return;

          // Wait for the video element to be ready
          await new Promise<void>((resolve) => {
            if (videoRef && videoRef.current) {
              if (videoRef.current.readyState >= 2) resolve();
              else videoRef.current.oncanplay = () => resolve();
            }
          });

          await initializeGestureRecognizer();
          timer.current = setTimeout(processVideoFrames, 100); // Start processing frames
        } catch (error) {
          console.error('Error in main initialization:', error);
        }
      }
    };

    main();

    // Cleanup on unmount
    return () => {
      if (gestureRecognizer) {
        gestureRecognizer.close();
        gestureRecognizer = null;
      }
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return { gesture };
};

export { useGestureRecognition };
