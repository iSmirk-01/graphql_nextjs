import AddGame from './components/games/AddGame'
import AllGames from './components/games/AllGames'
import SearchGame from './components/games/SearchGame'
import AddFormPost from './components/posts/AddFormPost'
import PostsList from './components/posts/PostsList'

function page() {
  return (
    <div>
      <AllGames />
      <SearchGame />
      <AddGame />
      <PostsList />
      <AddFormPost />
    </div>
  )
}

export default page
