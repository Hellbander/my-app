import '@testing-library/jest-dom'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import LoginOTP from '@/app/otp/page'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null
    }
  }
}))

describe('Login page', () => {
  it('renders login page', () => {
    const { container } = render(<LoginOTP />)
    expect(container).toMatchSnapshot()
  })
})