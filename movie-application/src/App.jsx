import React, { useEffect, useState } from "react";
import Search from "./Components/Search";

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

      return <p className="text-white">Loading...</p>

    }else{

        if(errorMessage != null){
          return <p className="text-red-500">{errorMessage}</p>
        }else{
          return (<ul>
            {movieList.map((movie)=>{
                return <p key={movie.id} className="text-white">{movie.title}</p>
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
            <img src="./logo.png" alt="Logo Image" />
            <img className="mb-16" src="./hero.png" alt="Hero Banner" />
            <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
            <Search searchTerm = {searchTerm} setSearchTerm={setSearchTerm}></Search>
          </header>

          <section className="all-movies">
            <h2>All movies</h2>

            <div>
                <DisplayMovieComponent 
                isloading={isloading} 
                movieList={movieList} 
                errorMessage={errorMessage}/>
            </div>
          </section>

        </div>


    </main>

  );
}

export default App;