import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './Blogform'
import { render, fireEvent } from '@testing-library/react'


test('BlogForm works correctly', () => {

  const createBlog = jest.fn()
  const component = render(
    <BlogForm
      onSubmit={createBlog}>
      <div className="testDiv" />
    </BlogForm>
  )

  const testTitle = component.container.querySelector('#title')
  const testAuthor = component.container.querySelector('#author')
  const testUrl= component.container.querySelector('#url')
  const testLikes = component.container.querySelector('#likes')
  const formInput = component.container.querySelector('form')

  fireEvent.change(testTitle, { target: { value: 'test blog' } })
  fireEvent.change(testAuthor, { target: { value: 'blogger' } })
  fireEvent.change(testUrl, { target: { value: 'blog.com' } })
  fireEvent.change(testLikes, { target: { value: 5 } })
  fireEvent.submit(formInput)

  console.log(prettyDOM(testTitle))
  console.log(prettyDOM(testAuthor))
  console.log(prettyDOM(testUrl))
  console.log(prettyDOM(testLikes))

  expect(component.container.querySelector('.testDiv')).toBeDefined()

  expect(createBlog.mock.calls.length).toBe(1)

  expect(createBlog.mock.calls[0][0].title).toBe('test blog')
  expect(createBlog.mock.calls[0][0].author).toBe('blogger')
  expect(createBlog.mock.calls[0][0].url).toBe('blog.com')
  expect(createBlog.mock.calls[0][0].likes).toBe('5')
  console.log(createBlog.mock.calls[0][0].title)

})
