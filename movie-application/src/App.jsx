import React, { useState } from "react";
import Search from "./Components/Search";


const App = ()=>{

  const [searchTerm, setSearchTerm] = useState("");

  return (

    <main>

      <div className = "pattern" />

        <div className = "wrapper">
          
          <header>
            <img className="mb-16" src="./hero.png" alt="Hero Banner" />
            <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          </header>

          <Search searchTerm = {searchTerm} setSearchTerms={setSearchTerm}></Search>
          
        </div>


    </main>

  );
}

export default App;