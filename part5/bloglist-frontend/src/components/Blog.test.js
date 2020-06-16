import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import Togglable from './Togglable'
import { render, fireEvent } from '@testing-library/react'

test('renders title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'testurl.com',
    author: 'testblogger',
    likes: 5000,
    user: { username: 'user', name: 'u1', password: 'asecret' }
  }
  const user = {

    username: 'user',
    name: 'u1',
    password: 'asecret'
  }


  const[blogs, setBlogs] = [blog]
  const[notification, setNotification] = []
  const mockHandler = jest.fn()
  const mockHandler_2 = jest.fn()
  const mockHandler_3 = jest.fn()

  const   component = render(
    <Blog
      blog={blog}
      user = {user}
      blogs= {blogs}
      setBlogs={setBlogs}
      blogService = {mockHandler_3}
      setNotification = {setNotification} />
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
  const user = {

    username: 'user',
    name: 'u1',
    password: 'asecret'
  }


  const[blogs, setBlogs] = [blog]
  const[notification, setNotification] = []
  const mockHandler = jest.fn()
  const mockHandler_2 = jest.fn()
  const mockHandler_3 = jest.mock()

  const   component = render(
    <Blog
      blog={blog}
      user = {user}
      blogs= {blogs}
      setBlogs={setBlogs}
      blogService = {mockHandler_3}
      setNotification = {setNotification} />
  )
  const button = component.getByText('view')

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
  const user = {

    username: 'user',
    name: 'u1',
    password: 'asecret'
  }

  const[blogs, setBlogs] = [blog]
  const mockHandler = jest.fn()
  const mockHandler_2 = jest.fn()

  const{ getByText } = render(
    <Blog
      blog={blog}
      increaseLikes = {mockHandler}
      handleRemove = {mockHandler_2} />
  )
  const view_button = getByText('view')
  fireEvent.click(view_button)

  const button = getByText('like')

  fireEvent.click(button)
  fireEvent.click(button)

  //expect(mockHandler.mock.calls).toHaveLength(2)
  expect(mockHandler.mock.calls.length).toBe(2)

})


describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
  test('toggled content can be closed', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const closeButton = component.container.querySelector(
      'button:nth-child(2)'
    )
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})

