import { events } from "../../utils/data";
import ProductCard from "../../components/ProductCard";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Jadwal Event & Workshop Undiksha</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <ProductCard key={event.id} item={event} />
        ))}
      </div>
    </div>
  );
}