"use client"

import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { postAdded } from "../../redux/features/posts/postsSlice"
import { selectAllUsers } from "../../redux/features/users/userSlice"

const AddFormPost = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [userId, setUserId] = useState<string>("")

    const users = useSelector(selectAllUsers)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (title && content && userId) {
            dispatch(postAdded(title, content, userId))
            setTitle('')
            setContent('')
            setUserId('')
        }
    }

  return (
    <form
      className="border flex flex-col gap-6 px-10 py-6"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-[2fr_1fr] gap-4 max-w-[500px] place-items-center mx-auto">
        <label htmlFor="postTitle" className="text-start">
          Post Title:{" "}
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
          required
          className="border rounded py-2 px-4"
        />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-4 max-w-[500px] place-items-center mx-auto">
        <label htmlFor="postContent" className="text-start">
          Post Content:{" "}
        </label>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
          className="border rounded py-2 px-4"
        />
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-4 max-w-[500px] place-items-center mx-auto">
        <label htmlFor="postContent" className="text-start">
          Post Content:{" "}
        </label>
        <select name="Users" id="userId" required value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="" disabled>
            --Select User--
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="border max-w-[250px] py-2 px-4 rounded mx-auto disabled:bg-red-500 bg-green-500"
        type="submit"
        disabled={!title || !content || !userId}
      >
        Submit
      </button>
    </form>
  );
}

export default AddFormPost
