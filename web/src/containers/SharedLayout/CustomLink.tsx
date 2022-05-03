import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";

type PropTypes = {
  children: (val: { match: boolean }) => React.ReactNode;
} & Omit<LinkProps, "children">;

export function CustomLink({ children, to, ...props }: PropTypes) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link to={to} {...props}>
      {children({ match: !!match })}
    </Link>
  );
}
