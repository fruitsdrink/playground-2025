import { Rating } from "./components";

export function App() {
  return (
    <main className=" w-full h-screen grid place-items-center bg-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <Rating />
      </div>
    </main>
  );
}
