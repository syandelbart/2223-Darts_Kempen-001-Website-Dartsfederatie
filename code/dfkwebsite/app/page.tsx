import ImageRead from './ImageRead';

export default function Page() {
  return (
    <div>
      <ImageRead title="This is a title" summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "/>
      <ImageRead title="This is a title" summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris...
" order={true} />
    </div>
  );
}