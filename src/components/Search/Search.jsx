export default function Search({ keywords, setKeywords}) {
  return (
    <div className="search">
      <img src="/icons/search.svg" alt="search" />
      <input type="text" placeholder="Введите запрос..." value={keywords} onChange={(e) => setKeywords(e.target.value)}/>
    </div>
  )
}