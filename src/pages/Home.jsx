import MovieCard from "../components/MovieCard"
import { useState,useEffect } from "react"
import "../css/Home.css"
import { searchMovies, getPopularMovies } from "../service/api"
import { useLocation } from "react-router-dom";



   
function Home() {

const [searchQuery, setSearchQuery] = useState("");
const [Movies, setMovies] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);
const location = useLocation();


    const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return

    setLoading(true)
    try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
    } catch (err) {
        console.log(err)
        setError("Failed to search movies...")
    } finally {
        setLoading(false)
    }
  };


useEffect(() => {
  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setError(null); // also reset error if successful
    } catch (err) {
      console.error("Error fetching popular movies:", err);
      setError("Failed to load popular movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (location.pathname === "/") {
    loadPopularMovies();
  }
}, [location.pathname]);
  return(
    
   < div className="home">
    <form  onSubmit={handleSearch} className="search-form">
      <input type="text" placeholder="Search for a movie..." className="search-input" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}} />
      <button type="submit" className="search-button">Search</button>
    </form>
    
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
    {Movies.length === 0 && !error ? (
      <div className="no-results">No movies found for your search.</div>
    ) : (
      <div className="movies-grid">
        {Movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    )}
  </>
      )}
    </div>
  ) 
}

export default Home;