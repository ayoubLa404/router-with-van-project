import React, { useState } from 'react';
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import { loginUser } from '../Components/api';

export function loginLoader({ request }) {
  // create a url {} from request obj and get message from searchPramas :(
  const message = new URL(request.url).searchParams.get('message');
  return message;
}

// this help as with the from by Form component
export async function loaginAction({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const data = await loginUser({ email, password });
    const pathname = new URL(request.url)?.searchParams.get('redirectTo') || '/host';

    localStorage.setItem('loggedin', true);
    return redirect(pathname);
  } catch (error) {
    return error;
  }
  return null;
}

export default function Login() {
  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
  //   const [status, setStatus] = useState('idle');
  //   const [error, setError] = useState(null);
  //   const navigate = useNavigate();
  const message = useLoaderData();
  const error = useActionData();
  const navigation = useNavigation();

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     setStatus('submitting');
  //     setError(null);
  //     loginUser(loginFormData)
  //       .then((res) => {
  //         console.log(res);
  //         navigate('/host', { replace: true });
  //       })
  //       .catch((err) => {
  //         setError(err);
  //       })
  //       .finally(() => setStatus('idle'));
  //   }

  //   function handleChange(e) {
  //     const { name, value } = e.target;
  //     setLoginFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }

  return (
    <div className="login-container">
      {message && <h3 style={{ color: 'red' }}>{message}</h3>}
      <h1>Sign in to your account</h1>
      {error && <h3 style={{ color: 'orangered' }}>{error.message}</h3>}
      <Form method="Post" className="login-form" replace>
        <input
          name="email"
          type="email"
          placeholder="Email address"
          //   onChange={handleChange}
          //   value={loginFormData.email}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          //   onChange={handleChange}
          //   value={loginFormData.password}
        />
        <button disabled={navigation.state === 'submitting'}>
          {navigation.state === 'submitting' ? 'logging in ...' : 'log in'}
        </button>
      </Form>
    </div>
  );
}
