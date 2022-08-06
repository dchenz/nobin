import React from "react";
import { Link } from "react-router-dom";
import { PageRoutes } from "../../shared/Routes";
import "./styles.scss";

/**
 * NavBrand is a logo image that links to the homepage.
 */
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