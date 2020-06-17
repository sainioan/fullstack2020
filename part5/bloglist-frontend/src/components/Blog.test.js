import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import { render, fireEvent } from '@testing-library/react'

test('renders title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'testurl.com',
    author: 'testblogger',
    likes: 5000,
    user: { username: 'user', name: 'u1', password: 'asecret' }
  }


  const mockHandler = jest.fn()
  const mockHandler_2 = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      increaseLikes = {mockHandler}
      handleRemove = {mockHandler_2} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'testblogger'
  )
  expect(component.container).not.toHaveTextContent(
    'testurl.com'
  )
  expect(component.container).not.toHaveTextContent(
    5000
  )

})

test('renders url and likes when the view button is clicked', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'testurl.com',
    author: 'testblogger',
    likes: 5000,
    user: { username: 'user', name: 'u1', password: 'asecret' }
  }

  const mockHandler = jest.fn()
  const mockHandler_2 = jest.fn()

  const   component = render(
    <Blog

      blog={blog}
      increaseLikes = {mockHandler}
      handleRemove = {mockHandler_2}/>
  )
  const button = component.getByText('View')

  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'testurl.com'
  )
  expect(component.container).toHaveTextContent(
    5000
  )

})
test('if the like button is clicked twice, the event handler the component received as props is called twice.', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'testurl.com',
    author: 'testblogger',
    likes: 5000,
    user: { username: 'user', name: 'u1', password: 'asecret' }
  }

  const mockHandler = jest.fn()
  const mockHandler_2 = jest.fn()

  const{ getByText } = render(
    <Blog
      blog={blog}
      increaseLikes = {mockHandler}
      handleRemove = {mockHandler_2} />
  )
  const view_button = getByText('View')
  fireEvent.click(view_button)

  const button = getByText('Like')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})