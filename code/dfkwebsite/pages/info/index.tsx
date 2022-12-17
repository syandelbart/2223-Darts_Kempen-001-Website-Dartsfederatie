import Selectie from "../../components/Selectie";

export default function Info() {
  return (
    <div>
      <h1 className="text-6xl mb-20 text-white font-bold">Info</h1>
      <div className="flex gap-20">
        <Selectie
          href="/info/nieuws"
          title="nieuws"
          icon="fluent:news-16-regular"
        />
        <Selectie href="/info/kalender" title="kalender" icon="uil:calender" />
        <Selectie
          href="/info/documenten"
          title="documenten"
          icon="mingcute:documents-line"
        />
        <Selectie
          href="/info/inschrijvingen"
          title="inschrijvingen"
          icon="mdi:file-document-edit-outline"
        />
      </div>
    </div>
  );
}
