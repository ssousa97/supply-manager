import { Link, NavLink } from 'react-router-dom'

const pages = [
  {
    name: 'Dashboard',
    path: '/',
  },
  {
    name: 'Contratos',
    path: '/contracts',
  },
  {
    name: 'Empenhos',
    path: '/orders',
  },
  {
    name: 'Materiais',
    path: '/items',
  },
  {
    name: 'Financeiro',
    path: '/finance',
  },
]

export default function Pages() {
  return (
    <div className="mt-10 flex h-full">
      <ul className="flex w-full flex-col">
        {pages.map((page) => (
          <li key={page.name}>
            <NavLink
              to={page.path}
              className={({ isActive }) =>
                'block rounded-lg p-5 text-white hover:bg-tertiary hover:underline ' +
                (isActive ? 'bg-tertiary' : 'bg-primary')
              }>
              {page.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
