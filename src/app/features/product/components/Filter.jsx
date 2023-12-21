import PropTypes from "prop-types";
import { Card, Container } from "../../../components";

function Filter({ filters, setFilters, searchTxt, setSearchTxt }) {

  const handleChangeFilter = (e, index, filterName) => {
    setFilters((prevState) =>
      prevState.map((filter) =>
        filter.name === filterName
          ? {
              ...filter,
              options: filter.options.map((option, idx) =>
                idx === index
                  ? { ...option, isSelected: !option.isSelected }
                  : option
              ),
            }
          : filter
      )
    );
  };

  return (
    <Container>
      <Card>
        <div className="p-5 flex justify-between items-center">
          <div className="px-8 border-r-2">
            <h1 className="text-2xl font-bold mb-2">Filter</h1>
            {filters.map((filter) => (
              <div key={filter.name}>
                <span className="text-xl font-semibold">{filter.name}</span>
                <ul className="mt-2">
                  {filter.options.map((option, index) => (
                    <li
                      key={option.value}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center">
                        <input
                          id={`${filter.id}-${option.value}`}
                          defaultValue={option.value}
                          defaultChecked={option.isSelected}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                          onChange={(e) =>
                            handleChangeFilter(e, index, filter.name)
                          }
                        />
                        <label
                          htmlFor={`${filter.id}-${option.value}`}
                          className="ml-3 text-sm font-medium text-gray-900"
                        >
                          {option.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/3">
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Search"
              value={searchTxt}
              onChange={(e) => setSearchTxt(e.target.value)}
            ></input>
          </div>
        </div>
      </Card>
    </Container>
  );
}

Filter.propTypes = {
  filters: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
  searchTxt: PropTypes.string,
  setSearchTxt: PropTypes.func.isRequired,
};

export default Filter;
