import {useLoaderData} from '@remix-run/react';
import {
  type LoaderFunction,
  type LoaderFunctionArgs,
  json,
} from '@remix-run/server-runtime';
import {TPAppleIcon, TPGooglePlayIcon, TPTeepsIcon} from '~/assets/icons';

import {Button, Input, Separator} from '~/components';
import {COLLECTIONS_QUERY} from '~/graphql/queries';

export const loader: LoaderFunction = async ({context}: LoaderFunctionArgs) => {
  const {collections} = await context.storefront.query(COLLECTIONS_QUERY);
  return json({collections});
};

export default () => {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <div className="pt-12 px-6 bg-light flex items-center justify-center flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-lg font-exo font-semibold uppercase">Catalog</h1>
          <div className="h-32 w-32 rounded-full bg-black"></div>
          <h1 className="text-lg font-exo font-semibold uppercase">
            Bine ai venit!
          </h1>
        </div>
        <div className="w-full flex flex-col items-center">
          <p className="text-sm font-roboto font-medium">Continua fara cont:</p>
          <Input className="mt-2 placeholder:italic" placeholder="Email" />
          <Button layout="primary" className="mt-4" title="Continua" />
          <Separator className="mt-6" text="sau" />
          <Button
            className="mt-6"
            layout="primary"
            title={
              <p>
                Autentificare cu <b>Teeps</b>
              </p>
            }
            icon={<TPTeepsIcon />}
          />
          <Button
            className="mt-6"
            layout="secondary"
            title={
              <p>
                Afla mai multe despre <b>Teeps</b>
              </p>
            }
          />
          <p className="my-8 text-sm text-primary font-roboto font-medium">
            Vrei cont? Descarcă teeps din...
          </p>
        </div>
      </div>
      <div className="p-6 flex items-center gap-4">
        <Button title="App Store" layout="secondary" icon={<TPAppleIcon />} />
        <Button
          title="Google Play"
          layout="secondary"
          icon={<TPGooglePlayIcon />}
        />
      </div>
    </>
  );
};
