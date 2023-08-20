import DefaultList from './default/DefaultList';

const DefaultBoard = async ({
  title: categoryName,
  id,
  url,
}: {
  title: string;
  id: string;
  url: string;
}) => {
  return <DefaultList categoryName={categoryName} categoryId={id} categoryUrl={url} />;
};

export default DefaultBoard;
