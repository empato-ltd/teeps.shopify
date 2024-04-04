import {memo} from 'react';
import {useFetcher, useLoaderData, useSearchParams} from '@remix-run/react';

export const Collections = memo(() => {
  const fetcher = useFetcher();
  const [searchParams, setSearchParams] = useSearchParams();
  const {collections, collection} = useLoaderData() as {
    collections: any[];
    collection: any;
  };

  const onSubmit = (collection: string) => {
    fetcher.submit({handle: collection}, {method: 'POST', action: '/catalog'});
  };

  return (
    <fetcher.Form action="/catalog" method="POST">
      <div className="px-4 pt-4 pb-6 flex items-center justify-between shadow-lg">
        {collections?.map((collection: any, index: number) => (
          <button
            type="button"
            onClick={() => onSubmit(collection?.handle)}
            key={collection?.id}
            className="flex flex-col items-center"
          >
            <div className="h-15 w-15 rounded-full border-secondary border flex items-center justify-center overflow-hidden py-1">
              <img
                src={collection?.image?.url}
                alt={collection?.title}
                className="object-cover max-h-full"
              />
            </div>
            <span
              className={`font-roboto text-xs mt-1 ${
                searchParams.get('collection') === collection?.handle
                  ? 'text-primary font-semibold'
                  : 'text-black'
              }`}
            >
              {collection?.title}
            </span>
          </button>
        ))}
      </div>
    </fetcher.Form>
  );
});
