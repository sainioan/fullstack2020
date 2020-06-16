/* import React, { useState } from 'react'

export default ({ submit }) => {
  const [form, setForm] = useState({})

  const handleChange = name => e =>
    setForm({ ...form, [name]: e.target.value })

  const submitForm = e => {
    e.preventDefault()
    submit(form)
    setForm({})
  }

  return (
    <form id='form' onSubmit={submitForm}>
      <p>
        Title: <input id='title' title={form.title} onChange={handleChange('title')} />
      </p>
      <p>
        Author: <input id='author' author={form.author} onChange={handleChange('author')} />
      </p>
      <p>
        Url: <input  id='url' url={form.url} onChange={handleChange('url')} />
      </p>
      <p>
        Likes: <input  id='likes'likes={form.likes} onChange={handleChange('likes')} />
      </p>
      <p>
        <button type="submit">Create</button>
      </p>
    </form>
  )
}
 */