'use client'

import { useContext } from 'react'


import VesselsTableComponent from '@/components/table'
import { VesselsContext } from '@/utils/context/vessels.context'

export default function Home() {
  const { vessels } = useContext(VesselsContext)

  return (
    <main>
      <VesselsTableComponent vessels={vessels} />
    </main>
  )
}
