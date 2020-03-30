import React from "react";
import { Route } from "react-router-dom";
import { MoviesList } from "./components/MoviesList";
import { MovieDetails } from "./components/MovieDetails";
import { MovieFavorities } from "./components/MovieFavorities";

export const ApplicationRoutes = () => (
  <>
    <Route path="/" exact component={MoviesList} />
    <Route path="/movies/:id" exact component={MovieDetails} />
    <Route path="/favorites" exact component={MovieFavorities} />
  </>
);