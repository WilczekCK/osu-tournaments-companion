import Team from "components/Team";

export default function TeamsList({teams}: Team[]) {
  const areQualifiers = teams[1].name === 'Qualifiers';

  return (
    <div>
        <Team name={teams[0].name} players={teams[0].players} />
        {!areQualifiers && (
            <Team name={teams[1].name} players={teams[1].players} />
        )}
    </div>
  );
}