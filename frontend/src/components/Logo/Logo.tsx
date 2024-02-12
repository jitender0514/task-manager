import React from 'react'
// import LOGO from '../../assets/images/logos/logo-icon.png'
import SMALL_LOGO from '../../assets/images/logos/logo-small.png'
import WITHOUT_BG_LOGO from '../../assets/images/logos/logo-without-bg.svg'

type LogoProps = {
    type?: 'small' | 'large';
    bgColor?: string;
}


const Logo: React.FC<LogoProps> = ({type, bgColor='transparent'}: LogoProps) => {
  return (
    <div className='logo-container mx-auto' >
        <img style={{backgroundColor: bgColor}}  className='logo-image h-14 mr-3 sm:h-14 ' src={ type == 'small' ? SMALL_LOGO : WITHOUT_BG_LOGO } alt="React Image" />
    </div>
  )
}

export default Logo