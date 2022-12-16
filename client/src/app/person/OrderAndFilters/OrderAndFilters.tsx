import styled from '@emotion/styled'
import { FiltersForm } from './FiltersForm'
import { Order, OrderField } from './OrderField'

type Props = {
  order: Order
  onToggleOrder: () => void
  handleFitlerChange: (e: number, n: string) => void
  experience: number
  name: string
}

export function OrderAndFilters({
  order,
  onToggleOrder,
  handleFitlerChange,
  experience,
  name
}: Props): JSX.Element {
  return (
    <Container>
      <OrderField order={order} onToggleOrder={onToggleOrder} />
      <FiltersForm
        handleFitlerChange={handleFitlerChange}
        experience={experience}
        name={name}
      />
    </Container>
  )
}

const Container = styled.div({})
