import { Spinner } from './spinner'

export const PageLoader = () => {
  return (
    <div className="grid place-items-center h-[calc(100dvh-64px)]">
      <Spinner className="size-10" />
    </div>
  )
}
