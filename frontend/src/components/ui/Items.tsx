export const Item = ({ title, content }) => {
  return (
    <div>
      <span className='font-bold'>{title}</span>
      {content}
    </div>
  );
};
