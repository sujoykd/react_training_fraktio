import { useReducer, useTransition } from 'react'
import { useQuery } from 'react-query'
import { Header } from './layout/Header'
import { filterPeople } from './pages/IndexPage/filterPeople'
import { orderPeople } from './pages/orderPeople'
import { getPeople } from './pages/personService'
import { PersonList } from './person/list/PersonList'
import { PersonListSkeleton } from './person/list/PersonListSkeleton'
import { OrderAndFilters } from './person/OrderAndFilters/OrderAndFilters'
import { Order } from './person/OrderAndFilters/OrderField'
import { Person } from './person/person.interface'
import { unwrapResult } from './result'

export function App(): JSX.Element {
  const peopleQuery = useQuery(['people'], async () =>
    unwrapResult(await getPeople())
  )

  const { order, experience, name, onToggleOrder, onChangeFilters } =
    useFilters()

  const [isPending, startTransition] = useTransition()
  const handleToggleOrder = () => {
    startTransition(() => onToggleOrder())
  }

  const handleChangeFilters = (experience: number, name: string) => {
    startTransition(() => onChangeFilters(experience, name))
  }

  return (
    <>
      <Header />
      <OrderAndFilters
        order={order}
        onToggleOrder={handleToggleOrder}
        onChangeFilters={handleChangeFilters}
        experience={experience}
        name={name}
      />

      {peopleQuery.isLoading && <PersonListSkeleton />}

      {peopleQuery.isError && <p>Some error occured. Please try again.</p>}

      {peopleQuery.isSuccess && (
        <PersonList
          people={
            filterPeople(
              orderPeople(peopleQuery.data?.data.people, order),
              experience,
              name
            ) as Person[]
          }
          isUpdating={isPending}
        />
      )}
    </>
  )
}

type FilterState = {
  order: Order
  experience: number
  name: string
}

type ToggleOrderAction = {
  type: 'TOGGLE_ORDER'
}

type ChangeFilterAction = {
  type: 'CHANGE_FILTERS'
  payload: { name: string; experience: number }
}

type FilterAction = ToggleOrderAction | ChangeFilterAction

const initialState: FilterState = {
  experience: 0,
  name: '',
  order: 'asc'
}

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'TOGGLE_ORDER':
      return { ...state, order: state.order === 'asc' ? 'desc' : 'asc' }
    case 'CHANGE_FILTERS':
      return {
        ...state,
        name: action.payload.name,
        experience: action.payload.experience
      }
  }
}

function useFilters() {
  const [state, dispatch] = useReducer(filterReducer, initialState)

  const handleToggleOrder = () => dispatch({ type: 'TOGGLE_ORDER' })
  const handleChangeFilters = (experience: number, name: string) =>
    dispatch({ type: 'CHANGE_FILTERS', payload: { experience, name } })

  return {
    order: state.order,
    experience: state.experience,
    name: state.name,
    onToggleOrder: handleToggleOrder,
    onChangeFilters: handleChangeFilters
  }
}
