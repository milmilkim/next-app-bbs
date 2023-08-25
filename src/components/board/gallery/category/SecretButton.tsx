const Button = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='63'
      height='63'
      viewBox='0 0 63 63'>
      <defs>
        <filter
          id='사각형_55'
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
      <g id='카테고리8' transform='translate(-252 -423)'>
        <g transform='matrix(1, 0, 0, 1, 252, 423)' filter='url(#사각형_55)'>
          <g
            id='사각형_55-2'
            data-name='사각형 55'
            transform='translate(2 2)'
            fill='#ffd400'
            stroke='#000'
            strokeWidth='5'>
            <rect width='51' height='51' stroke='none' />
            <rect x='2.5' y='2.5' width='46' height='46' fill='none' />
          </g>
        </g>
        <path
          id='패스_80'
          data-name='패스 80'
          d='M.608,5.315H4.56L6.908-5.346V-10.08H-1.74v4.734ZM-1.74,14.969H6.908V7.179H-1.74Z'
          transform='translate(276.916 448.055)'
        />
      </g>
    </svg>
  );
}

export default Button;