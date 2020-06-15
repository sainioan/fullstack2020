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
/* 
      increaseLikes = {mockHandler_2}

      viewEverything ={mockHandler} */
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

//describe('<Blog />', () => {
  /* let component
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
  beforeEach(() => {
    const[blogs, setBlogs] = [blog]
    const[notification, setNotification] = []
    const mockHandler = jest.fn()
    const mockHandler_2 = jest.fn()
    const mockHandler_3 = jest.fn()
    component = render(
      <Blog
        blog={blog}
        viewEverything ={mockHandler}
        user = {user}
        blogs= {blogs}
        setBlogs={setBlogs}
        blogService = {mockHandler_3}
        increaseLikes = {mockHandler_2}
        setNotification = {setNotification} />
    )

    component.debug()
  })

  test('renders title and author', () => {


    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
      'testblogger'
    )
 
})
  test('button of a component is pressed twice handler is running twice', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandler_2.mock.calls.length).toBe(2);
  }) */
 // test('clicking the button calls event handler once', () => {
/*     const blog = {
      title: 'Component testing is done with react-testing-library',
      url: 'testurl.com',
      author: 'testblogger',
      likes: 5000,
      user: { username: 'user', name: 'u1', password: 'asecret' }

    } */

/*     const button = component.getByText('hide')
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1) */

 /*    const { getByText } = render(
      <Blog blog={blog} blogs = {blogs} user ={user} onClick={mockHandler} setNotification={setNotification} />
    ) */

  /*   const button2 = getByText('like')
    fireEvent.click(button2)
    fireEvent.click(button2)
    expect(mockHandler.mock.calls.length).toBe(2)
  */
/* })
}) */

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

