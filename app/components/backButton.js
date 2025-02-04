'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const BackButton = () => {
  const router = useRouter()

  return (
    <Button 
      onClick={() => router.back()}
    >
      <ArrowLeft size={16} />
      Back
    </Button>
  )
}

export default BackButton