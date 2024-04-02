import {Link, useMatches, useNavigation} from '@remix-run/react';
import {memo} from 'react';

const categories = ['catalog', 'comenzi', 'recenzii'];

export const Categories = memo(() => {
  const matches = useMatches();
  const currentRoute = matches?.at(1)?.pathname;

  return (
    <div className="px-4">
      <div className="border border-secondary rounded-[10px] flex items-center justify-between">
        {categories.map((category, index) => (
          <Link
            to={category}
            key={index}
            className={`m-[1px] rounded-[10px] p-2.5 flex-1 text-center font-exo uppercase text-sm font-medium ${
              currentRoute?.includes(category)
                ? 'bg-primary text-white'
                : 'text-black'
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
});
