import ImageRead from './ImageRead';


export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello, Next.js!
        <ImageRead />
      </h1>
    </div>
  );
}
