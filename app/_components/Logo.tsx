import React from 'react'
import Image from 'next/image'
import logo from '../../public/logo.svg'
const Logo = () => {
  return (
    <div>
       <div className='w-full flex  items-center py-4 px-2'>
     <Image src={logo} width={70} height={70} alt='logo' />
     <div className='text-2xl text-pink-500   font-bold'>
      Ru
      <span className='text-yellow-500'>bb</span>er
     </div>
    </div>
    </div>
  )
}

export default Logo
