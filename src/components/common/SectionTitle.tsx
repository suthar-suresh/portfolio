const SectionTitle = ({ children, level = 2, id }: Readonly<{ children: string; level?: 1 | 2 | 3 | 4 | 5 | 6; id?: string }>) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <HeadingTag id={id} className="text-center mx-auto text-3xl/6 md:text-4xl/6 font-bold">
      {children}
    </HeadingTag>
  );
};

export default SectionTitle;
