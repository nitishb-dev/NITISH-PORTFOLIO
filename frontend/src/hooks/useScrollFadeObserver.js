import { useEffect, useRef, useState, useCallback } from 'react';

const useScrollFadeObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const timeoutRef = useRef(null);
  const lastStateRef = useRef(false);

  const debouncedSetVisible = useCallback((visible) => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Add hysteresis - require a brief delay before changing state
    // This prevents rapid flickering when scrolling near boundaries
    timeoutRef.current = setTimeout(() => {
      if (lastStateRef.current !== visible) {
        setIsVisible(visible);
        lastStateRef.current = visible;
      }
    }, visible ? 50 : 150); // Faster to show, slower to hide
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersectionRatio = entry.intersectionRatio;
        const isCurrentlyVisible = entry.isIntersecting && intersectionRatio > 0.1;

        debouncedSetVisible(isCurrentlyVisible);
      },
      {
        threshold: [0, 0.1, 0.25, 0.5], // Multiple thresholds for better control
        rootMargin: '-10px 0px -80px 0px', // Gentler margins to prevent edge flickering
        ...options,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [debouncedSetVisible, options]);

  return [ref, isVisible];
};

export default useScrollFadeObserver;