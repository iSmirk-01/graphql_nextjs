"use client"

import { useSelector } from "react-redux"
import { selectAllPost } from "../../redux/features/posts/postsSlice"
import AuthorById from "../common/AuthorById"
import TimeAgo from "../common/TimeAgo"
import ReactionButton from "./ReactionButton"

const PostsList = () => {

    const posts = useSelector(selectAllPost)

  return (
    <section className="flex flex-col justify-center items-center gap-8 py-5 my-10 border">
        <h2 className="text-4xl font-bold">Posts</h2>
      {posts.map((post) => (
        <div className="border p-8 gap-4 flex flex-col" key={post.id}>
            <h3 className="text-2xl font-semibold text-center">{post.title}</h3>
            <p className="text-gray-300">{post.content}</p>
            <AuthorById id={post.userId}  />
            <TimeAgo timeStamp={post.date} />
            <ReactionButton post={post} />
        </div>
      ))}
    </section>
  )
}

export default PostsList
