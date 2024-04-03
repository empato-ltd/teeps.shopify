import {memo, useEffect, useState} from 'react';
import {useFetcher, useSearchParams} from '@remix-run/react';
import {useForm, type SubmitHandler} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {Button, Input} from '..';
import testamentLogo from 'public/images/testamentLogo.png';

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
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const onSubmit: SubmitHandler<AuthSchemaType> = async (data) => {
    setLoading(true);
    fetcher.submit({...data}, {method: 'post'});
  };

  useEffect(() => {
    if (loading && fetcher.state === 'idle') {
      setLoading(false);
      setEmailSent(true);
    }
  }, [fetcher]);

  return (
    <fetcher.Form
      action="/"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 pt-12 px-6 bg-light flex items-center justify-center flex-col gap-8"
    >
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-lg font-exo font-semibold uppercase">Catalog</h1>
        <div className="h-32 w-32 rounded-full bg-black flex items-center justify-center">
          <img src={testamentLogo} alt="t" height={100} width={100} />
        </div>
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
        <Button
          disabled={emailSent}
          loading={loading}
          className="mt-1"
          layout="primary"
          title="Continua"
        />
        {emailSent && (
          <p className="text-xs text-primary mt-2">Check your email</p>
        )}
        <div className="flex-1 flex flex-col justify-end">
          <p className="my-8 text-sm text-primary font-roboto font-medium">
            Descarca aplicatia Teeps
          </p>
        </div>
      </div>
    </fetcher.Form>
  );
});
