import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/spaces/$spaceId/subjects/$subjectId_/activities/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/spaces/$spaceId/subjects/$subjectId/activities/"!</div>
}
