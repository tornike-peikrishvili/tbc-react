export default function Loading() {
  return (
    <div className="m-auto flex">
      <div className="relative">
        <div
          className="absolute h-12 w-12 rounded-full
    border-4 border-solid border-gray-200"
        ></div>
        <div
          className="absolute h-12 w-12 animate-spin rounded-full
    border-4 border-solid border-indigo-600 border-t-transparent"
        ></div>
      </div>
    </div>
  );
}
