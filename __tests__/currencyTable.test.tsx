import '@testing-library/jest-dom'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import CurrencyTable from '@/app/table/page'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null
    }
  }
}))

describe('Login page', () => {
  it('renders login page', () => {
    const { container } = render(<CurrencyTable />)
    expect(container).toMatchSnapshot()
  })
})