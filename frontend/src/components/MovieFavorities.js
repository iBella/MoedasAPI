import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const MovieFavorities = () => {
    const movies = useSelector(state => state.favorities);

  	return (
    <div>
        <Link to={"/"}>Voltar</Link>
	  	<ul>
            {movies.favorities.map( (movie, index) => (
                <li key={index}>{movie.title}</li>
            ))}
	  	</ul>
    </div>
	);
};