"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
    const router = useRouter()
    const goBack = () => {
        router.back()
    }
  return (
    <button
      onClick={goBack}
      className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
      data-testid="back-button"
    >
      Back
    </button>
  );
}

export default BackButton
