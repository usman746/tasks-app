import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  // console.log(error);

  return (
    <>
      <div className="flex flex-col my-10 justify-center items-center">
        <h1 className="text-primary">Error</h1>
        <Link to="/" className="hover:text-primary">
          <h2>Home</h2>
        </Link>
        <p>{error.data || error.message}</p>
      </div>
    </>
  );
}

export default ErrorPage;
