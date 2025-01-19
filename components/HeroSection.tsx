import Link from 'next/link'  
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DotPattern } from '@/components/ui/dot-pattern'
import React from 'react'
import { TextAnimate } from '@/components/ui/text-animate'
import SparklesText from '@/components/ui/sparkles-text'

export default function HeroSection() {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:p-20 md:shadow-xl">
    <div className="flex flex-col justify-center items-center leading-10 text-center space-y-4 md:space-y-6">
      {/* <FlipText
    className="text-lg font-bold"
    word="Background and Text Color Combinations Generator"
  /> */}
      <SparklesText
        className="text-2xl md:text-5xl"
        text="Background and Text Color Combinations Generator"
      />
      <TextAnimate
        animation="blurInUp"
        by="character"
        className="text-sm sm:text-base md:text-lg lg:text-xl text-center"
      >
        Color Accessibility Toolkit Create beautiful, accessible color
        combinations with ease
      </TextAnimate>

      <Link href="#colorContrast" aria-label="Get started with color contrast checker">
        <Button size="lg" className="font-semibold">Get Started</Button>
      </Link>
    </div>

    <DotPattern
      width={20}
      height={20}
      cx={1}
      cy={1}
      cr={1}
      className={cn(
        "absolute inset-0 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      )}
    />
  </div>
  )
}
