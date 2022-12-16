import styled from '@emotion/styled'
import { FiltersForm } from './FiltersForm'
import { Order, OrderField } from './OrderField'

type Props = {
  order: Order
  onToggleOrder: () => void
  handleFitlerChange: (e: number, n: string) => void
  experienceFilter: number
  nameFilter: string
}

export function OrderAndFilters({
  order,
  onToggleOrder,
  handleFitlerChange,
  experienceFilter,
  nameFilter
}: Props): JSX.Element {
  return (
    <Container>
      <OrderField order={order} onToggleOrder={onToggleOrder} />
      <FiltersForm
        handleFitlerChange={handleFitlerChange}
        experience={experienceFilter}
        name={nameFilter}
      />
    </Container>
  )
}

const Container = styled.div({})
