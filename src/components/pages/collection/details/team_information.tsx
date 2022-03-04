interface ITeamInfoProps {
  info: string;
}

export default function TeamInfo({ info }: ITeamInfoProps) {
  return (
    <div className="">
      <div className="mt-10 text-2xl font-bold">Team Information</div>
      <div className="mt-3 text-sm text-gray-500">{info}</div>
    </div>
  );
}
