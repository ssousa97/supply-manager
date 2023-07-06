import { NavLink } from 'react-router-dom'

const navbarLinks = [
  {
    title: 'Dashboard',
    path: '/',
  },
  {
    title: 'Contratos',
    path: '/contracts',
  },
  {
    title: 'Empenhos',
    path: '/orders',
  },
  {
    title: 'Estoque',
    path: '/items',
  },
  {
    title: 'Financeiro',
    path: '/finance',
  },
  {
    title: 'Configurações',
    path: '/config',
  },
]
export default function Navbar() {
  return (
    <div className="navbar w-full bg-base-300">
      <div className="mx-2 flex flex-1 px-2">
        <div className="flex flex-col">
          <span className="text-2xl text-primary">RCCS</span>
          <span className="text-sm">Vendas & Serviços</span>
        </div>
      </div>
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal">
          {navbarLinks.map((link, index) => (
            <li key={index}>
              <NavLink to={link.path}>{link.title}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
