import { useState } from 'react'
import { Header } from './layout/Header'
import { orderPeople } from './pages/orderPeople'
import { people } from './people'
import { PersonList } from './person/list/PersonList'
import { OrderAndFilters } from './person/OrderAndFilters/OrderAndFilters'
import { Order } from './person/OrderAndFilters/OrderField'
import { Person } from './person/person.interface'

export function App(): JSX.Element {
  const [order, setOrder] = useState<Order>('asc')
  const handleToggleOrder = () => {
    setOrder((current) => (current === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <>
      <Header />
      <OrderAndFilters order={order} onToggleOrder={handleToggleOrder} />
      <PersonList people={orderPeople(people, order) as Person[]} />
    </>
  )
}
