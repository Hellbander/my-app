import '@testing-library/jest-dom'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import Login from '@/app/page'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null
    }
  }
}))

describe('Login page', () => {
  it('renders login page', () => {
    const { container } = render(<Login />)
    expect(container).toMatchSnapshot()
  })

  it('should submit form', () => {
    const handleOnSubmitMock = jest.fn();
    render(<Login />)
    screen.getByRole("form", { name: 'login' }).onsubmit = handleOnSubmitMock
    fireEvent.click(screen.getByRole('button'))
    expect(handleOnSubmitMock).toHaveBeenCalledTimes(1);
  })

  it('should put email information', () => {
    render(<Login />)
    const input = screen.getByPlaceholderText('Enter your email here')
    fireEvent.change(input, {
      target: {
        value: 'email@email.com'
      }
    })
    expect(input).toHaveValue('email@email.com')
  })

  it('should put password information', () => {
    render(<Login />)
    const input = screen.getByPlaceholderText('Enter your password here')
    fireEvent.change(input, {
      target: {
        value: '12345678'
      }
    })
    expect(input).toHaveValue('12345678')
  })
})