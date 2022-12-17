import ImageRead from '../components/ImageRead';

export default function Homepage() {
  return (
    <div>
      <ImageRead title="This is a title" summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " date={1}/>
      <ImageRead title="This is a title" summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris..." order={true} date={1}/>
    </div>
  );
}