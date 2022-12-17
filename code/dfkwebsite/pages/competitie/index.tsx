import Selectie from "../../components/Selectie";

export default function Competitie() {
  return (
    <div>
      <h1 className="text-6xl mb-20 text-white font-bold">Competitie</h1>
      <div className="flex gap-20">
        <Selectie
          href="/competitie/speeldagen"
          title="speeldagen"
          icon="fluent:news-16-regular"
        />
        <Selectie href="/info/kalender" title="kalender" icon="uil:calender" />
        <Selectie
          href="/competitie/klassement"
          title="klassement"
          icon="mingcute:documents-line"
        />
        <Selectie
          href="/competitie/individueleranking"
          title="individueleranking"
          icon="mdi:file-document-edit-outline"
        />
      </div>
    </div>
  );
}
