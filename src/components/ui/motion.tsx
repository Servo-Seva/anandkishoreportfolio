import { motion, useInView, Variants } from 'framer-motion';
import { ReactNode, useRef, forwardRef } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
}

const getVariants = (direction: string): Variants => {
  const directions: Record<string, { x?: number; y?: number }> = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  return {
    hidden: {
      opacity: 0,
      ...directions[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };
};

export const Reveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  once = true,
}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={getVariants(direction)}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export const StaggerContainer = forwardRef<HTMLDivElement, StaggerContainerProps>(({
  children,
  className = '',
  staggerDelay = 0.1,
  once = true,
}, forwardedRef) => {
  const internalRef = useRef(null);
  const isInView = useInView(internalRef, { once, margin: '-50px' });

  return (
    <motion.div
      ref={(node) => {
        internalRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

export const StaggerItem = ({
  children,
  className = '',
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}) => {
  return (
    <motion.div
      variants={getVariants(direction)}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Smooth scale animation on hover
export const HoverScale = ({
  children,
  className = '',
  scale = 1.02,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
}) => {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
