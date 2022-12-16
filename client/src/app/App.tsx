import { useState } from 'react'
import { Header } from './layout/Header'
import { filterPeople } from './pages/IndexPage/filterPeople'
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

  const [experienceFilter, setExperienceFilter] = useState(0)
  const [nameFilter, setNameFilter] = useState('')

  const handleFitlerChange = (experienceFilter: number, nameFilter: string) => {
    setExperienceFilter(experienceFilter)
    setNameFilter(nameFilter)
  }

  return (
    <>
      <Header />
      <OrderAndFilters
        order={order}
        onToggleOrder={handleToggleOrder}
        handleFitlerChange={handleFitlerChange}
        experienceFilter={experienceFilter}
        nameFilter={nameFilter}
      />
      <PersonList
        people={
          filterPeople(
            orderPeople(people, order),
            experienceFilter,
            nameFilter
          ) as Person[]
        }
      />
    </>
  )
}
