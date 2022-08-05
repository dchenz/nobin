import React from "react";
import { Link } from "react-router-dom";
import { PageRoutes } from "../../properties/Routes";
import "./styles.scss";

export default function NavBrand(): JSX.Element {
  return (
    <Link id="nav-brand" to={PageRoutes.home}>
      <img
        src="/static/media/logo.png"
        alt="Brand logo"
        height="36"
      />
    </Link>
  );
}