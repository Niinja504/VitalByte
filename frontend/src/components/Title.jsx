import { useTitle } from '../hooks/components/useTitle';

const Title = ({ texto }) => {
  useTitle(texto);
  return (
    <h1 className="products-title">
      {texto}
    </h1>
  );
}

export default Title;