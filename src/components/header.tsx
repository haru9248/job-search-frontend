import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="bg-blue-900 flex items-center justify-between px-8" style={{height: '20%'}}>
        <h1 className="text-3xl font-bold p-4 text-white">求人検索アプリ</h1>
      <nav className="flex gap-4">
            <Link className="text-white" to="/">求人一覧</Link>
            <Link className="text-white" to="/job-post">求人投稿</Link>
      </nav>
    </header>
  )
}

export default Header