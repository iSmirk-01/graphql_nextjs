import { useSelector } from "react-redux"
import { selectAllUsers } from "../../redux/features/users/userSlice"

function AuthorById(props: { id: string }) {

    const users = useSelector(selectAllUsers)
    const author = users.find((user) => user.id === props.id)

  return (
    <span>by {author?.name || "Unknown Author"}</span>
  )
}

export default AuthorById
