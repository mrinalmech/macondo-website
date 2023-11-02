import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

interface Props {
  to: string;
  children: React.Node;
  activeClassName?: string;
  partiallyActive?: boolean;
  className?: string;
  external?: boolean;
  [prop: string]: any;
}

const Link = ({ children, to, activeClassName, partiallyActive, external, ...other }: Props) => {
  const internal = /^\/(?!\/)/.test(to) && !external;

  if (internal) {
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    );
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  );
};
export default Link;
