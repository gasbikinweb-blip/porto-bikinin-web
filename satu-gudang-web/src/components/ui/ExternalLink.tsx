// Link eksternal dengan rel aman (selalu tab baru)
type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function ExternalLink({ children, ...props }: Props) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
