import { ISODateString } from "next-auth";

export type MovieSmall = {
  tmdbId: string;
  adult: boolean;
  id: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  releaseDate: string;
  title: string;
  video: false;
  voteAverage: number;
  voteCount: number;
  posters: posterSizes;
  backdrops: backdropSizes;
  genres: number[];
  seen: boolean | null;
  liked: boolean | null;
  disliked: boolean | null;
  watchlist: boolean | null;
  comments: string | null;
};

type backdropSizes = {
  w300?: string;
  w780?: string;
  w1280?: string;
  original?: string;
};
type posterSizes = {
  w92?: string;
  w154?: string;
  w185?: string;
  w342?: string;
  w500?: string;
  w780?: string;
  original?: string;
};

export type FullMovie = Omit<MovieSmall, "genres"> & {
  adult: false;
  belongsToCollection: {
    id: number;
    name: string;
    posterPath: string;
    backdropPath: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  imdbId: string;
  productionCompanies: {
    id: number;
    logoPath: string;
    name: string;
    originCountry: string;
  }[];
  productionCountries: {
    iso31661: string;
    name: string;
  }[];
  releaseDate: string;
  revenue: number;
  runtime: number;
  spokenLanguages: {
    englishName: string;
    iso6391: string;
    name: string;
  }[];
  status: "Released";
  tagline: string;
  videos: {
    iso6391: string;
    iso31661: string;
    name: string;
    key: string;
    site: "YouTube";
    size: number;
    type: string;
    official: true;
    publishedAt: string;
    id: string;
  }[];
  cast: {
    adult: boolean;
    gender: number;
    id: number;
    knownForDepartment: string;
    name: string;
    originalName: string;
    popularity: number;
    profilePath: string;
    castId: number;
    character: string;
    creditId: string;
    order: number;
  }[];
  externalIds: ExternalIds;
};

export type ExternalIds = {
  id: number;
  imdbId?: string | null;
  facebookId?: string | null;
  instagramId?: string | null;
  twitterId?: string | null;
};

export type MoviesResponse = {
  page: number;
  results: MovieSmall[];
  totalPages: number;
  totalResults: number;
};

export type Status = "NONE" | "LIKED" | "DISLIKED";

export type Stats = {
  watched: number;
  watchlist: number;
};
export type Settings = {
  allowRegistration: boolean;
};

export type NewSession = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    admin?: boolean;
    id?: string | null;
  };
  expires: ISODateString;
};
