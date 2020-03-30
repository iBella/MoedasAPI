import React, {useState, useEffect} from "react";
import { MoviesService } from "../services/MoviesService";
import { Link } from "react-router-dom";
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline, IoIosInformationCircleOutline } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import {
  incrementFavorities,
  decrementFavorities,
  setFavorities
} from "../actions/favoritiesActions";

export const MoviesList = () => {
	const dispatch = useDispatch();
	const moviesList = useSelector(state => state.favorities);

	const [movies, setMovies] = useState({ data: { results: [] }});

	const requestMovies = async () => {
		const moviesResult = await MoviesService.getPopularMovies();
		setMovies(moviesResult);
	}

	useEffect( () => {
		requestMovies();
	}, []);

  	return (
	<div>
		<h1>Lista de Filmes</h1>
		<h2><Link to={"/favorites"}>Favoritos</Link> - {moviesList.favorities.length}</h2>
	  	<ul>
			{movies.data.results.map( movie => (
				<li key={movie.id}>   
					{movie.title}
					<button onClick={() => dispatch(incrementFavorities(movie))}><IoIosCheckmarkCircleOutline /></button>
					<button onClick={() => dispatch(decrementFavorities(movie))}><IoIosCloseCircleOutline /></button>
					<button><Link to={`/movies/${movie.id}`}><IoIosInformationCircleOutline /></Link></button>
				</li>
			))}
	  	</ul>
	</div>
	);
};
