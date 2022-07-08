import React from "react";

const Nav = () => {
  const pokeLogo = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
  
  return (
    <nav className="container-sm">
      <div className="justify-content-center d-flex">
        <img
          src={pokeLogo}
          alt="Pokeapi-logo"
        />
      </div>
    </nav>

  )
}

export default Nav;