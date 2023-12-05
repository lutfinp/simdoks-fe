import { getCategoryResponse } from "@/libs/api-libs";
import Image from "next/image";
import Link from "next/link";

const Menu2 = async () => {
  const category = await getCategoryResponse("categories");
  
  const icons = [
    { "path": "/assets/home.png" },
    { "path": "/assets/clock.png" },
    { "path": "/assets/badge-check.png" },
    { "path": "/assets/inbox.png" },
    { "path": "/assets/users-group.png" },
    { "path": "/assets/inbox-full.png" },
    { "path": "/assets/file-copy.png" },
    { "path": "/assets/dollar.png" },
    { "path": "/assets/stackoverflow.png" }
    ]

  return (
    <div className="text-xs">
      <div className="flex">
        <div className="ml-4 mt-2 flex flex-row gap-2">
          <Image src="/assets/simdoks_logo.png" width={53} height={59.74} />
          <Image src="/assets/simdoks_tulisan.png" width={130} height={24.75} />
        </div>
      </div>
      <div className="ml-2 mt-4 flex flex-col gap-1">
        {category.map((cat, index) => {
          const icon = icons[index];

          return (
            <Link
              href={cat.url_barcode}
              className="flex flex-row gap-2 p-2 mr-2 hover:bg-blue-800 rounded-lg transition-all hover:text-white"
              key={index}
            >
              <Image src={icon.path} width={20} height={20} />
              <p className="self-center">{cat.category_name}</p>
            </Link>
          );
        })}
      </div>
      <Link
        href="#"
        className="flex ml-2 p-2 mr-2 mt-5 bg-red-600 text-white hover:bg-red-900 rounded-lg transition-all"
      >
        <p className="text-center">Logout</p>
      </Link>
    </div>
  );
};

export default Menu2;
