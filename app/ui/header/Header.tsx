import Navigation from "./Navigation";
import SearchBar from "../search/SearchBar";

const Header = () => {
  return (
    <header className="bg-gray-800">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row lg:justify-between">
        <Navigation />
        <SearchBar />
      </div>
    </header>
  )
}

export default Header;