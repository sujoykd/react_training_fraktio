import styled from '@emotion/styled'

type Props = {
  years: number
}

export function Experience({ years }: Props): JSX.Element {
  const star = '⭑'

  return (
    <Text>
      <Star>{star.repeat(years / 5)}</Star> {years} years
    </Text>
  )
}

const Text = styled.span(({ theme }) => ({
  color: theme.colors.textDimmed,
  display: 'flex',
  alignItems: 'center',
  lineHeight: '1',
  gap: theme.spacing(2)
}))

const Star = styled.span({
  fontSize: '2em',
  lineHeight: '1'
})
