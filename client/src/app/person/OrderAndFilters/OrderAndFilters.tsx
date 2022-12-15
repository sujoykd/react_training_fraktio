import styled from '@emotion/styled'
import { Order, OrderField } from './OrderField'

type Props = {
  order: Order
  onToggleOrder: () => void
}

export function OrderAndFilters({ order, onToggleOrder }: Props): JSX.Element {
  return (
    <Container>
      <OrderField order={order} onToggleOrder={onToggleOrder} />
    </Container>
  )
}

const Container = styled.div({})
