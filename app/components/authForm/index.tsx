import {memo} from 'react';
import {Form, useFetcher} from '@remix-run/react';
import {useForm, type SubmitHandler} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {Button, Input, Separator} from '..';
import {TPTeepsIcon} from '~/assets/icons';
import {supabase} from '~/utils/supabase';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type AuthSchemaType = z.infer<typeof authSchema>;

export const AuthForm = memo(() => {
  const {
    register,
    resetField,
    handleSubmit,
    formState: {errors},
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
  });

  const fetcher = useFetcher();

  const onSubmit: SubmitHandler<AuthSchemaType> = async (data) => {
    fetcher.submit({...data}, {method: 'post'});
  };

  return (
    <fetcher.Form
      action="/"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 pt-12 px-6 bg-light flex items-center justify-center flex-col gap-8"
    >
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-lg font-exo font-semibold uppercase">Catalog</h1>
        <div className="h-32 w-32 rounded-full bg-black"></div>
        <h1 className="text-lg font-exo font-semibold uppercase">
          Bine ai venit!
        </h1>
      </div>
      <div className="w-full flex flex-col items-center flex-1">
        <p className="text-sm font-roboto font-medium">Autentificare:</p>
        <Input
          className="mt-2 placeholder:italic"
          placeholder="Email"
          autoComplete="off"
          {...register('email')}
        />
        <div className="h-6 flex items-center justify-center">
          <p className="text-xs text-red-500 leading-none">
            {errors.email?.message}
          </p>
        </div>
        <Button className="mt-1" layout="primary" title="Continua" />

        <div className="flex-1 flex flex-col justify-end">
          <p className="my-8 text-sm text-primary font-roboto font-medium">
            Descarca aplicatia Teeps
          </p>
        </div>
      </div>
    </fetcher.Form>
  );
});
