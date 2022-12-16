import styled from '@emotion/styled'
import { FiltersForm } from './FiltersForm'
import { Order, OrderField } from './OrderField'

type Props = {
  order: Order
  onToggleOrder: () => void
  onChangeFilters: (e: number, n: string) => void
  experience: number
  name: string
}

export function OrderAndFilters({
  order,
  onToggleOrder,
  onChangeFilters,
  experience,
  name
}: Props): JSX.Element {
  return (
    <Container>
      <OrderField order={order} onToggleOrder={onToggleOrder} />
      <FiltersForm
        onChangeFilters={onChangeFilters}
        experience={experience}
        name={name}
      />
    </Container>
  )
}

const Container = styled.div({})
