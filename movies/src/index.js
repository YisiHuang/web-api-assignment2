import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import ToWatchMoviesPage from "./pages/toWatchMoviesPage";
import TrendingMoviesPage from "./pages/TrendingMoviesPage";
import NowPlayingPage from "./pages/nowPlayingPage";
import CastListPage from "./pages/castListPage";
import CrewListPage from "./pages/crewListPage";
import PersonPage from "./pages/personDetailsPage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage.js";
import TopRatedTVPage from "./pages/topRatedTVPage";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthContextProvider>
        <SiteHeader />
        <MoviesContextProvider>
        <Routes>
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
          <Route path="/movies/toWatch" element={<ToWatchMoviesPage />} />
          <Route path="/movies/trending" element={<TrendingMoviesPage />} />
          <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
          </Route>
          <Route path="*" element={ <Navigate to="/" /> } />
          <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
          <Route path="/movies/now_playing" element={ <NowPlayingPage /> } />
          <Route path="/movies/:id/cast" element={<CastListPage />} />
          <Route path="/movies/:id/crew" element={<CrewListPage />} />
          <Route path="/person/:id" element={<PersonPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tv/top_rated" element={ <TopRatedTVPage /> } />
        </Routes>
        </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);