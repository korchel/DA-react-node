interface IItemInterface {
  title: string;
  content: string | number;
  className?: string;
}

export const Item = ({ title, content, className }: IItemInterface) => {
  return (
    <div className={className}>
      <span className='font-bold'>{title}</span>
      {content}
    </div>
  );
};
