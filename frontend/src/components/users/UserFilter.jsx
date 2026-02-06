import { Button } from "@/components/ui/button";

const UserFilter = ({ currentFilter, setCurrentFilter }) => {
  const filters = ["all", "pending", "approved", "rejected"];

  return (
    <div className="flex gap-3 items-center mr-[38%] ">
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
