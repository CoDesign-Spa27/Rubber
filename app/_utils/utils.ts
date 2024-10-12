const MIN_RADIUS = 7.5;
const MAX_RADIUS = 15;
const DEPTH = 5;  // Increased depth for better 3D effect
const LEFT_COLOR = "000";  // Soft blue
const RIGHT_COLOR = "fff"; // Purple
const NUM_POINTS = 2500;
const ANGLE_CACHE = new Map<number, { cos: number, sin: number }>();

// Utility to clamp values between 0 and 1
const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(value, max));

/**
 * Converts a ratio to a gradient color stop between two hex colors
 * --- Credit ---
 * https://stackoverflow.com/questions/16360533/calculate-color-hex-having-2-colors-and-percent-position
 */
const getGradientStop = (() => {
  const cache = new Map<number, string>();  // Memoize color stops for better performance
  return (ratio: number): string => {
    const clampedRatio = clamp(ratio);
    if (cache.has(clampedRatio)) return cache.get(clampedRatio)!;

    const [c0, c1] = [LEFT_COLOR, RIGHT_COLOR].map(color =>
      color.match(/.{1,2}/g)!.map(oct => parseInt(oct, 16))
    );

    const resultColor = c0.map((c0Part, i) =>
      Math.min(Math.round(c0Part * (1 - clampedRatio) + c1[i] * clampedRatio), 255)
    );

    const color = `#${resultColor.map(c => c.toString(16).padStart(2, "0")).join("")}`;
    cache.set(clampedRatio, color);
    return color;
  };
})();

// Utility to calculate angles once and cache them for reuse
const getCachedAngle = (angle: number) => {
  if (!ANGLE_CACHE.has(angle)) {
    ANGLE_CACHE.set(angle, {
      cos: Math.cos(angle),
      sin: Math.sin(angle),
    });
  }
  return ANGLE_CACHE.get(angle)!;
};

// Generates points with positions and colors
const generatePoints = (
  numPoints: number, 
  radiusRange: [number, number], 
  depthRange: [number, number]
) => 
  Array.from({ length: numPoints }, (_, idx) => {
    const randomRadius = randomFromInterval(...radiusRange);
    const randomAngle = Math.random() * Math.PI * 2;
    const { cos, sin } = getCachedAngle(randomAngle);
    
    const [x, y, z] = [
      cos * randomRadius,
      sin * randomRadius,
      randomFromInterval(...depthRange)
    ];

    const color = calculateColor(x);

    return { idx: idx + 1, position: [x, y, z], color };
  });

// Calculate the gradient color based on position
const calculateColor = (x: number): string => {
  const maxDiff = MAX_RADIUS * 2;
  const distance = x + MAX_RADIUS;
  const ratio = distance / maxDiff;
  return getGradientStop(ratio);
};

// Utility to generate random numbers between a given range
const randomFromInterval = (min: number, max: number) => 
  Math.random() * (max - min) + min;

// Inner and outer points
export const pointsInner = generatePoints(NUM_POINTS, [MIN_RADIUS, MAX_RADIUS], [-DEPTH, DEPTH]);

export const pointsOuter = generatePoints(NUM_POINTS / 4, [MIN_RADIUS / 2, MAX_RADIUS * 2], [-DEPTH * 10, DEPTH * 10]);
