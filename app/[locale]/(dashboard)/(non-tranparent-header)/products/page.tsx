// // "use client";

// import { getProducts } from "@/api";
// import { Product } from "@/app/[locale]/types";
// import ProductCard from "@/components/products/ProductsCard";
// import ProductSort from "@/components/products/ProductSort";

// // import ProductSearch from "@/components/products/ProductSearch";
// import { getScopedI18n } from "@/locales/server";
// // import { fetchProducts } from "@/utils/FetchProducts";

// // export interface Product {
// //   id: number;
// //   title: string;
// //   rating: number;
// //   category: string;
// //   price: number;
// //   thumbnail: string;
// // }

// async function ProductsPage() {
//   const t = await getScopedI18n("products");

//   // const [sortCriteria, setSortCriteria] = useState<string>("name");
//   // const [searchTerm, setSearchTerm] = useState<string>("");
//   // const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
//   // const [prevSortCriteria, setPrevSortCriteria] = useState<
//   //   string | undefined
//   // >();
//   // const [originalProducts, setOriginalProducts] = useState<Product[]>([]);

//   // const fetchData = async () => {
//   //   const products = await fetchProducts();
//   //   setSortedProducts(products.products);
//   //   setOriginalProducts(products.products);
//   // };

//   // useEffect(() => {
//   //   fetchData();
//   // }, []);

//   // let filteredProducts = sortedProducts.filter((product) =>
//   //   product.title.toLowerCase().includes(searchTerm.toLowerCase())
//   // );

//   const products = await getProducts();

//   return (
//     <div className="w-full">
//       <div className="p-8">
//         <h1 className="text-3xl font-bold mb-4 text-center dark:text-white tracking-widest">
//           {t("ourProduct")}
//         </h1>
//         <div className="w-4/5 m-auto flex flex-wrap justify-between">
//           <div className="w-full lg:w-1/5 px-2 mb-4">
//             <h2 className="text-xl font-bold mb-2 dark:text-white tracking-widest">
//               {t("filter")}
//             </h2>
//             <ProductSort
//             // setSortCriteria={setSortCriteria}
//             // searchTerm={searchTerm}
//             // sortedProducts={sortedProducts}
//             // setSortedProducts={setSortedProducts}
//             // prevSortCriteria={prevSortCriteria || ""}
//             // originalProducts={originalProducts}
//             // setPrevSortCriteria={setPrevSortCriteria}
//             // sortCriteria={sortCriteria}
//             />
//           </div>
//           <div className="w-full lg:w-4/5 px-2">
//             {/* <ProductSearch setSearchTerm={setSearchTerm} /> */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
//               {products.map((products: Product) => (
//                 <ProductCard
//                   key={products.id}
//                   id={products.id}
//                   name={products.name}
//                   description={products.description}
//                   price={products.price}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductsPage;

// // async function ProductsPage() {
// //   return (
// //     <div>
// //       <h1>Products</h1>
// //       <div>
// //         {products.map((products: Product) => (
// //           <ProductCard
// //             key={products.id}
// //             id={products.id}
// //             name={products.name}
// //             description={products.description}
// //             price={products.price}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default ProductsPage;
//  https://via.placeholder.com/400

import React from "react";
import EventCard from "@/components/admin/events/EventCard";
import EventCreateButton from "@/components/admin/events/EventCreateButton";
import { getApproveEvents } from "@/actions/events/get-approved-events";
import Filter from "@/components/admin/events/Filter";
import { EventProps } from "@/components/carousel/ThreeSlideCarousel";

export default async function Events() {
  const { events } = await getApproveEvents();

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
        <Filter />
        <div className="md:w-3/4">
          <div className="w-full flex justify-between text-center item-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
              Upcoming Events
            </h1>
            <EventCreateButton />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                category={event.category}
                location={event.location}
                price={event.price}
                amount={event.amount}
                organizer={event.organizer}
                starting={event.starting}
                eventData={event as EventProps}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
