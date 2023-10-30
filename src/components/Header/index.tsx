import React from "react";

const Header: React.FC = () => {
  
  return (
    <header className="navbar navbar-expand-lg navbar-light mt-3">
      <div className="container">
        <a className="navbar-brand w-100" href="/">
          <h1 className="text-white text-center">PokéDex Explorer</h1>
        </a>
      </div>
    </header>

  )
}

export default Header;