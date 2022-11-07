import NavItem from "./NavItem";

// Functionaliteit toevoegen van dropdown optie
export default function Navbar() {
  return (
    <ul>
        <NavItem href="overzicht" />
        <NavItem href="info" />
        <NavItem href="wedstrijden" />
        <NavItem href="uitslagen" />
        <NavItem href="contact" />
    </ul>
  );
}
