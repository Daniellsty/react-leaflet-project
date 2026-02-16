type Props = {
  onFilter: (value: string) => void;
};

const CityFilter = ({ onFilter }: Props) => {
  return (
    <input
      placeholder="Filter by city"
      onChange={(e) => onFilter(e.target.value)}
      className="border rounded p-3"
    />
  );
};

export default CityFilter;
