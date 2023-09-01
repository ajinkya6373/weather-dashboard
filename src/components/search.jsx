import SearchIcon from "@mui/icons-material/Search";
const LocationSearch = ({ onSearch }) => {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search for places..."
          className="outline-none p-2"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default LocationSearch;
