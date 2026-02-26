import { Button } from "@/components/ui/button";
import SearchUser from "./SearchUser";

const UserFilter = ({ currentFilter, setCurrentFilter }) => {
  const filters = ["all", "pending", "approved", "rejected"];

  return (
    <div className="flex gap-2 items-center">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={currentFilter === filter ? "default" : "outline"}
          onClick={() => setCurrentFilter(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </Button>
      ))}
    </div>
  );
};

export default UserFilter;
