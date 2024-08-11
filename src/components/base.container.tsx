'use client'

import HeaderComponent from './header.component'

export default function BaseContainer({ children }:{children: React.ReactNode}) {

  return (
    <div className="w-screen h-screen flex flex-col justify-center gap-4">
      <div className="w-screen px-8 py-2 flex-none flex justify-between">
        <HeaderComponent />
      </div>
      <div className="grow mx-8">
        {children}
      </div>
    </div>
  )
}