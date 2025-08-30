import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist.",
}

export default function NotFound() {
  return (
    <div>not-found</div>
  )
}
