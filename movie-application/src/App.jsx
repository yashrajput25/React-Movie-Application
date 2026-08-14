import React, { useEffect, useState } from "react";
import Search from "./Components/Search";
import Loader from "./Components/Loader";
import MovieCard from "./Components/MovieCard";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  mehtod: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
}

const DisplayMovieComponent = ({isloading, errorMessage, movieList}) => {

    if(isloading){
      
      return (
        <div>
            <Loader/>
            <p className="text-white">Loading...</p>
        </div>
      )
    }else{

        if(errorMessage != null){
          return <p className="text-red-500">{errorMessage}</p>
        }else{
          return (<ul>
            {movieList.map((movie)=>{
                return (
                  <MovieCard key = {movie.id} movie = {movie}/>
                );
        })
            }
          </ul>);
        }
    }

}


const App = ()=>{
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
      
      setIsLoading(true);
      setErrorMessage(null);

      try{
        const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        const response = await fetch(endpoint, API_OPTIONS);

        if(!response.ok){
            throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        console.log(data.results);
        setMovieList(data.results || []);

      }catch(error){
        console.log(error);
        setErrorMessage(error);
      }finally{
        setIsLoading(false);
      }
  }

  useEffect(()=>{
    fetchMovies();
  }, []);

  return (

    <main>

      <div className = "pattern" />

        <div className = "wrapper">
          
          <header>
            <img src="./logo.png" alt="Logo Image" className="w-[100px] h-[100px] mb-10" />
            <img className="mb-16" src="./hero.png" alt="Hero Banner" />
            <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
            <Search searchTerm = {searchTerm} setSearchTerm={setSearchTerm}></Search>
          </header>

          <section className="all-movies">
            <h2 className="mt-10">All movies</h2>
                <DisplayMovieComponent 
                isloading={isloading} 
                movieList={movieList} 
                errorMessage={errorMessage}/>
  
          </section>

        </div>


    </main>

  );
}

export default App;