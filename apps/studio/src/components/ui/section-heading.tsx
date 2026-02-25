interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h3 className={`section-heading ${className || ""}`}>
      {children}
    </h3>
  );
}
