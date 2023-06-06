import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import _ from '@lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginError, submitLogin } from '../../auth/store/loginSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(4, 'Password is too short - must be at least 4 chars.'),
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};

function SignInPage() {
  const dispatch = useDispatch();
  const login = useSelector(({ auth }) => auth.login);
  console.log('login', login);
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  console.log('errrors', errors);

  useEffect(() => {
    setValue('email', 'admin@fusetheme.com', { shouldDirty: true, shouldValidate: true });
    setValue('password', 'admin', { shouldDirty: true, shouldValidate: true });
  }, [setValue]);

  useEffect(() => {
    if (login.errors.length !== 0) {
      setError('password', {
        type: 'manual',
        message: login.errors,
      });
    }
  }, [login.errors, setError]);

  function onSubmit(modal) {
    dispatch(loginError(''));
    dispatch(submitLogin(modal))
      .then((r) => {
        console.log('success');
      })
      .catch((e) => {
        console.log('this is error', e);
      });
    // jwtService
    //   .signInWithEmailAndPassword(email, password)
    //   .then((user) => {
    //     // No need to do anything, user data will be set at app/auth/AuthContext
    //   })
    //   .catch((_errors) => {
    //     console.log("_errors", _errors)
    //     _errors.forEach((error) => {
    //       setError(error.type, {
    //         type: 'manual',
    //         message: error.message,
    //       });
    //     });
    //   });
  }

  return (
    <div
      className="flex flex-col items-center justify-center  h-full"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage:
          "url('https://images.pexels.com/photos/3695238/pexels-photo-3695238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      <div className="max-w-400 min-w-400 p-32 mx-auto sm:mx-0 p-5 bg-white">
        <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
          Sign in
        </Typography>
        <form
          name="loginForm"
          noValidate
          className="flex flex-col justify-center w-full mt-32"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-24"
                label="Email"
                autoFocus
                type="email"
                error={!!errors.email}
                helperText={errors?.email?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-24"
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors?.password?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />
          <Button
            variant="contained"
            color="secondary"
            className=" w-full mt-16"
            aria-label="Sign in"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            type="submit"
            size="large"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
