export default function PersonShow({ person }) {
  const { primary_name, ...demo } = person;
  return <pre className="mb-0">{JSON.stringify(demo, null, 2)}</pre>;
}
