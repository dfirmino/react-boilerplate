import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

describe('teste do boilerPlate', () => {
  test('App', () => {
    const { getByTestId } = render(<App />)
    const h1 = getByTestId('teste')
    expect(h1.innerHTML).toBe('Glória a Deuxxx')
  })
})
