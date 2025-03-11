import AddGame from './components/AddGame'
import AllGames from './components/AllGames'
import SearchGame from './components/SearchGame'

function page() {
  return (
    <div>
      <AllGames />
      <SearchGame />
      <AddGame />
    </div>
  )
}

export default page
