import Form from "next/form";

const SearchBar = () => {
  return (
    <div className="flex my-auto lg:mx-0 px-2 py-2 relative lg:max-w-lg w-full">
      <Form action="/search" className="w-full">
        <input
          type="search"
          id="query"
          name="query"
          className="w-full"
          placeholder="Search for Exercises, Muscle Groups, Equipment, etc..."
        />

        <button className="absolute bg-white text-slate-900 rounded-sm right-4 top-3 z-10 w-8 h-8 font-bold leading-8 text-3xl flex justify-center">
          &#8981;
        </button>
      </Form>
    </div>
  );
};

export default SearchBar;
