# Lernportfolio - Mein Vorgehen

## Verlauf

Zunächst richtete ich das grundlegende Layout des Projekts ein. Ich gliederte dies in
`js`, `css` und `assets`. Der Serviceworker und die `index.html` behielt ich auf root 
Ebene. Anfänglich hatte ich vor verschiedene HTML-Templates für meine verschiedenen Zwecke
zu verwenden. Um allerdings den Anforderungen zu genügen stellte sich das als zu redundant
dar, da sich beispielsweise Fragen und Antworten mittels Javascript dynamisch rendern
lassen. Deshalb investierte ich viel Zeit in das Verständnis der DOM bzw. dynamischen 
Renderns. Wenn mir danach war, entwickelte ich am Design mittels CSS und entdeckte viele
Facetten, die die Markup-Sprache bietet. Daher existieren in den frühen Commits viele 
Nice-To-Have-Features, wie Themes, eine animierte Navbar, sowie ein Fragen-Editor, 
den ich jedoch für die finale Andwendung entfernte um die Anwendung single-page zu lassen.
Da nach einer Weile viele CSS Regeln, die alle von arbiträr definierten Klassen abhingen
die Übersicht über das Projekt schwierig machten, entschied ich mich in der Mitte des
Projekts für eine Umgestaltung des Codes in Klassen. Später entwickelte sich dies zu den
Modell-Klassen in [question.js](js/question.js). 

Nachdem alles ordentlich genug für mich war, entschied ich mich, die anderen HTML Dateien 
aus dem Projekt zu löschen und die exakten Minimal-Anforderungen für das Projekt zu implementieren.
Dazu gehörte z.B. die Trennung zwischen lokal verfügbaren Fragen aus dem Fragenkatalog von
den remote verfügbaren Fragen der API, sowie das Rendern der Mathe-bezogenen Fragen mit Katex.
Seitdem ist das Projekt zu einem Lernprojekt geworden in welchem ich immer mal wieder für mich neue
Facetten der Webentwicklung austeste.

## Reflektion

An dieser Stelle werte ich mein Vorgehen aus und gliedere es in gute und schlechte Ideen, 
abhängig davon ob sie positiv oder negativ zum Entwicklungsprozess beigetragen haben.

### Gute Ideen

* die frühe Einarbeitung in die REST-API
* Stück für Stück dynamische Anpassung der DOM bevor ich ein riesiges Konstrukt aus statischen Markup-Daten erstelle
* Befassung mit CSS statt nur Kopieren aus dem Internet, sodass ich jetzt einen guten Überblick darüber habe
* 

### Schlechte Ideen

* Verkrampftes festbeißen am dynamischen Rendern
* langes Entwickeln ohne die kleineren Schritte zu testen => damit verbundene schwer findbare Fehler
* zu viele Nice-To-Have-Features implementiert bevor überhaupt alles funktioniert hat
* späte Nutzung des Typescript Plugins meiner IDE, die vieles erleichtert hätte
* 