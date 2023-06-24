import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)
  return (
    <div className="grid h-[100vh] place-content-center">
      <div className="flex flex-col items-center text-3xl">
        <h1>404</h1>
        <p>Page not found</p>
      </div>
    </div>
  )
}
