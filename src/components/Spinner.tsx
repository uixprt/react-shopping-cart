export const Spinner = (): JSX.Element => (
  <>
    <svg className="svg-def">
      <defs>
        <filter id="strokeGlow" y="-10" x="-10" width="250" height="150">
          <feOffset dx="0" dy="0" result="centeredOffset"></feOffset>
          <feGaussianBlur
            in="centeredOffset"
            stdDeviation="2"
            result="blur1"
          ></feGaussianBlur>
          <feGaussianBlur
            in="centeredOffset"
            stdDeviation="5"
            result="blur2"
          ></feGaussianBlur>
          <feGaussianBlur
            in="centeredOffset"
            stdDeviation="15"
            result="blur3"
          ></feGaussianBlur>
          <feMerge>
            <feMergeNode in="blur1"></feMergeNode>
            <feMergeNode in="blur2"></feMergeNode>
            <feMergeNode in="blur3"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>
    </svg>

    <div className="spinner-wrapper">
        <div className="spinner-loader">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 250 200"
          >
            <path
              id="jump"
              d="M55.5 98.5c0-35.3 31.3-64 70-64s70 28.7 70 64"
            ></path>
            <ellipse
              strokeWidth="1"
              id="circleL"
              cx="55.2"
              cy="102.5"
              rx="21.7"
              ry="5.5"
            ></ellipse>
            <ellipse
              strokeWidth="1"
              id="circleR"
              cx="195.2"
              cy="103.5"
              rx="21.7"
              ry="5.5"
            ></ellipse>
            <path
              id="jumpReflection"
              d="M55.5 98.5c0-35.3 31.3-64 70-64s70 28.7 70 64"
            ></path>
          </svg>
        </div>
      </div>
  </>
);
