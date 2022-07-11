import React from "react";

export interface IFavorite {
  favoritePokemons: [string],
  updateFavorite: (id: string) => void;
}

const FavoriteContext = React.createContext<IFavorite>({
    favoritePokemons: [""],
    updateFavorite: () => null,
})

export const FavoriteProvider = FavoriteContext.Provider

export default FavoriteContext;