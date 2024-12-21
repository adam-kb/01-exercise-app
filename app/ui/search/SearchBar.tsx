import Form from "next/form";

const SearchBar = () => {
  return (
    <div className="mx-auto max-w-7xl px-2 bg-slate-700 py-2 border-t border-t-slate-500 relative">
      <Form action="/search">
        <input
          type="search"
          id="query"
          name="query"
          className="w-full"
          placeholder="Search for Exercises, Muscle Groups, Equipment, etc..."
        />
        <button className="absolute bg-white text-slate-900 rounded-sm right-4 top-3 z-10 w-8 h-8 font-bold leading-8 text-2xl flex justify-center">
          Q
        </button>
      </Form>
    </div>
  );
};

export default SearchBar;
