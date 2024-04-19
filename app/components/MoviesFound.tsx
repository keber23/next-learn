interface Props {
  count?: number;
}
export default function MoviesFound({ count = 1 }: Props) {
  return (
    <p>
      <b>{count}</b>
      {count === 1 ? " movie found" : " movies found"}
    </p>
  );
}
