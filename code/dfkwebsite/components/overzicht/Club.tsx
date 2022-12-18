type MyProps = {
    clubnaam: string;
    clubplek: string;
    straatnaam: string;
    postcode: string;
};
export default function Club(props: MyProps) {
  return (
    <div className="bg-nav-background py-2 px-3 rounded-lg text-white">
      <p className="mb-4 text-3xl font-bold">{props.clubnaam}</p>
      <div className="flex gap-8 children:hover:cursor-pointer">
        <p className="rounded-2xl px-8 py-1 bg-[#676767]">Teams</p>
        <p className="rounded-2xl px-10 py-1 bg-[#95A4F3]">Edit</p>
      </div>
      <div className="my-3">
        <p>{props.clubplek}</p>
        <p>{props.straatnaam}</p>
        <p>{props.postcode}</p>
      </div>
    </div>
  );
}
