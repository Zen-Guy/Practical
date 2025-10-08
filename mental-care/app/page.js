'use client'
import Link from 'next/link'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar />

      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Mental Health in India</h1>
        <p className="max-w-2xl text-lg mb-8">
          Mental health issues are rising rapidly in India, especially among youth. According to national surveys, over 14% of India’s population suffers from some form of mental illness, and many cases go undiagnosed or untreated.
        </p>
        <p className="max-w-2xl text-lg mb-10">
          To better understand your mental well-being, take our quick 15-question quiz. It will give you a basic assessment and guide you toward helpful resources.
        </p>
        <Link href="/quiz">
          <button className="btn btn-primary text-lg px-8">Take the Quiz</button>
        </Link>
      </div>
    </div>
  )
}
