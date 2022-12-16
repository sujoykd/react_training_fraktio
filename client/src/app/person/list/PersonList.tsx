import styled from '@emotion/styled'
import { PersonCard } from '../card/PersonCard'
import { Person } from '../person.interface'
import { PersonListHeader } from './PersonListHeader'

type Props = {
  people: Person[]
}

export function PersonList({ people }: Props): JSX.Element {
  return (
    <div>
      <PersonListHeader
        title="Potential Candidates"
        description={`Showing ${people.length} people(s)`}
      />
      <ListContainer>
        {people.map((p: any) => (
          <ListItem key={p.uuid}>
            <PersonCard person={p} />
          </ListItem>
        ))}
      </ListContainer>
    </div>
  )
}

const ListItem = styled.li({
  listStyle: 'none'
})

const ListContainer = styled.ul(({ theme }) => ({
  display: 'grid',
  margin: 0,
  padding: 0,
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: theme.spacing(4)
}))
