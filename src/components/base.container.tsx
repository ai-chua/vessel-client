'use client'

import HeaderComponent from './header.component'

export default function BaseContainer({ children }:{children: React.ReactNode}) {

  return (
    <div className="w-screen h-screen border-1 border-danger-500/25 flex flex-col justify-center gap-4">
      <div className="w-screen px-8 py-2 flex-none flex justify-between border-2 border-primary-500/25">
        <HeaderComponent />
      </div>
      <div className="grow mx-8 border-2 border-warning-500/50">
        {children}
      </div>
    </div>
  )
}