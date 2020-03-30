import React, {useState, useEffect} from "react";
import { MoviesService } from "../services/MoviesService";
import { Link } from "react-router-dom";

export const MovieDetails = (props) => {
	const [movie, setMovie] = useState({});

	const requestMovie = async (movieId) => {
		const moviesResult = await MoviesService.getPopularMovieDetails(movieId);
		setMovie(moviesResult.data);
	}

	useEffect( () => {
		requestMovie(props.match.params.id);
	}, [props.match.params.id]);

  	return (
		<div>
			<ul>
				<li>Title: {movie.title}</li>
				<li>Popularity: {movie.popularity}</li>
				<li>budget: {movie.budget}</li>
			</ul>
			<Link to={"/"}>Voltar</Link>
		</div>
	);
};
