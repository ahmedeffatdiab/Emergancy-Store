
export default function EmptyCartAlert() {
  return (
    <div className="container mx-auto min-h-40 flex justify-center items-center w-1/2">
      <div className="w-full shadow-md py-5 border ">
        <div className=" text-lg font-semibold text-center text-red-500">
          No products found
        </div>
        <div className="text-center w-full">
          You have not bought any products yet.
        </div>
      </div>
    </div>
  );
}
