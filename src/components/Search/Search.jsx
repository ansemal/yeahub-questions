export default function Search({ keywords, setKeywords }) {
  return (
    <div className="search" data-cy="search-component">
      <img src="/icons/search.svg" alt="search" />
      <input
        type="text"
        name='search'
        data-cy="search-input"
        placeholder="Введите запрос..."
        value={keywords}
        onChange={e => setKeywords(e.target.value)}
      />
    </div>
  );
}
