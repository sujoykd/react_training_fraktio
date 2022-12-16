import { useEffect } from 'react'
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { ExperienceField } from './ExperienceField'
import { NameField } from './NameField'

export type Data = {
  experience?: number
  name?: string
}

type Props = {
  handleFitlerChange: (e: number, n: string) => void
} & Data

export function FiltersForm({
  handleFitlerChange,
  experience,
  name
}: Props): JSX.Element {
  const form = useForm<Data>({
    defaultValues: {
      experience: experience,
      name: name
    }
  })

  const handleSubmit = (data: Data) => {
    handleFitlerChange(data.experience ?? 0, data.name ?? '')
  }

  useSubmitOnChange(form, handleSubmit)

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <NameField />
        <ExperienceField />
      </form>
    </FormProvider>
  )
}

function useSubmitOnChange(
  form: UseFormReturn<Data>,
  onSubmit: (data: Data) => void
) {
  useEffect(() => {
    const subscription = form.watch((data) => onSubmit(data))

    return () => subscription.unsubscribe()
  }, [form, onSubmit])
}
