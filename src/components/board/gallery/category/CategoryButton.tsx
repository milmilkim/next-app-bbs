const Button = ({ color }: { color: string }) => {
  return (
    <div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        width='63'
        height='63'
        viewBox='0 0 63 63'>
        <defs>
          <filter
            id='카테고리1'
            x='0'
            y='0'
            width='63'
            height='63'
            filterUnits='userSpaceOnUse'>
            <feOffset dx='4' dy='4' />
            <feGaussianBlur stdDeviation='2' result='blur' />
            <feFlood floodOpacity='0.161' />
            <feComposite operator='in' in2='blur' />
            <feComposite in='SourceGraphic' />
          </filter>
        </defs>
        <g transform='matrix(1, 0, 0, 1, 0, 0)' filter='url(#카테고리1)'>
          <g
            id='카테고리1-2'
            data-name='카테고리1'
            transform='translate(2 2)'
            fill={color}>
            <path
              d='M 48.5 48.5 L 2.5 48.5 L 2.5 2.5 L 48.5 2.5 L 48.5 48.5 Z'
              stroke='none'
            />
            <path
              d='M 5 5 L 5 46 L 46 46 L 46 5 L 5 5 M 0 0 L 51 0 L 51 51 L 0 51 L 0 0 Z'
              stroke='none'
              fill='#000'
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Button;