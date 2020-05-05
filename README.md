# Web Design @cmda-minor-web 1920
## Inhoudsopgave
- [Exclusive Design](#exclusive-design)
- [User Scenario](#user-scenario)
- [Tests](#tests)
    - [Test 1](#test-1-08-04-2020)
    - [Test 2](#test-2-15-04-2020)
    - [Test 3](#test-3-22-04-2020)
- [Conclusie](#conclusie)

## Exclusive Design
### Study Situation
De persoon voor wie we deze opdracht maken is Roger Ravelli. Roger heeft maculadegeneratie en verliest steeds meer van zijn zicht. Voor zijn werk moest Roger veel technische tekeningen, spreedsheets en dergelijke lezen. Wegens de ontwikkeling van zijn aandoening heeft hij moeite gekregen om deze technische tekeningen en dergelijke af te lezen. 

Nu ligt aan ons de taak om een oplossing voor Roger te ontwerpen en te ontwikkelen zodat hij met zo min mogelijk moeite deze technische tekeningen, grafieken, tabellen of datavisualisaties kan zien.

Roger gebruikt tegenwoordig screenreaders omdat lezen hem veel energie kost. De screenreader die hij gebruikt maakt deel uit van de toegankelijkheidsoftware genaamd Supernova.

### Ignore Conventions
Ik gebruikte links (`<a>` tags) om elementen na te bootsen waardoor er doorheen getabd kan worden en waardoor deze elementen opgelezen kunnen worden door de screenreader.

### Prioritise Identity
Roger is een beeldhouwer dus dacht ik om de achtergrond van de website een stenen textuur te geven. Hierdoor is de site toch iets persoonlijker voor Roger geworden.
### Add Nonsense
Ik heb bij de aria-labels van de links hier een daar willekeurige komma's en punten geplaatst. Hieruit blijkt dat de screenreader veel natuurlijker en menselijker klinkt dan zonder met de willekeurige interpunctie.

## User Scenario
Boudewijn is 58 jaar en heeft jarenlang gewerkt als Bouwkundig Inspecteur. Voor zijn werk moest Boudewijn technische tekeningen, tabellen en grafieken aflezen. Maar door zijn aandoeningen begon hij zijn zicht kwijt te raken. Uit zijn rechteroog ziet 
Boudewijn tegenwoordig maar 2 procent. 

Boudewijn gebruikt tegenwoordig een screenreader om websites voor hem voor te lezen. Maar het is gebleken dat weinig websites screenreaders goed ondersteunen. Waaronder ook allerlei Covid-19 sites. 

Boudewijn wilt de huidige staat van Covid-19 in Nederland weten. Het is natuurlijk van levensbelang maar veel sites zijn nogal slecht toegankelijk met een screenreader. Hier moet er verandering aan komen.

## Tests
### Test 1 (08-04-2020)
Tijdens dit gesprek hebben we Roger een paar websites laten testen zodat we zijn gedrag op het web kunnen noteren. De site die wij hebben getest ging over de ontwikkeling van Covid-19. https://informationisbeautiful.net/visualizations/covid-19-coronavirus-infographic-datapack/ Hier is een korte samenvatting wat gebeurde tijdens de test:

>Begrijpt het in eerste instantie niet. “Spaghetti” Moeite om te navigeren van de covid spaghetti terug naar de bongo chat. Verward tussen tabs. Blijft vast op de covid. Weet niet hoe hij een tabblad sluit. Gebruikt chrome? Kent de shortcut niet om tab te sluiten? Weet zich wel “redelijk” te navigeren binnen 1 tab, maar meerdere tabs is een issue. Heeft een eizo monitor (ColorEdge?). Items op scherm lijken groot. Grote knoppen voor youtube maps en taskbar.
Heeft een rode muiscursor anders ziet hij de muis niet. Kan niet in een keer de gehele grafiek zien. Kan de assen lezen van de spaghetti covid grafiek. Ziet dat singapore en japan laag zijn? Screenreader zegt helemaal niks. Proberen op de iPad. Mail gestuurd en gebruikt siri voiceover om mail te vinden. Ziet wel dat de mail ontvangen op telefoon. Siri screenreader weet wel de covid spaghetti site af te lezen maar zegt alleen image dus niet bruikbaar. Vind tabellen makkelijker dan grafieken.

#### Bevindingen Test 1
- Gebruikt windows (supernova - meerdere functies o.a. braille regel) hele slechte ervaring
- fan van siri op ipad/Iphone als screenreader
- Goeie ervaring met dark-mode
- wilt graag contrasten/contouren zien
- Data moet consistent afgebeeld worden, dus niet in verschillende vormen
- Wilt wellicht iets met OCR zoals dedicon
- Text to speech van supernova vind hij heel vervelend en onmogelijk
- Spraak als ondersteuning, niet als uitgangs positie
- Wellicht gebruiken van RAW-Bestanden (veel pixels, extreem inzoomen), hele hoge resolutie


### Test 2 (15-04-2020)
Wij hebben voor Roger een aantal prototypes gemaakt. Deze prototypes zijn gebaseerd op de drie opdrachten. Hier zijn een aantal aantekeningen die ik heb gemaakt tijden mijn test:

>Vind die tabellen heel goed en leesbaar. Tabellen maken goed gebruik van het beeld (Responsive). Screenreader werkt totaal niet, net zoals alle vorige tests. Tab / Pijltjestoetsen werken niet?Even een hack zoeken of anders met aria-label. Wilt wel screenreader blijven gebruiken. Kleuren combinatie vindt hij goed en kan heel erg snel de data van de tabellen aflezen. (Lettertype is goed?). Wilt graag meerdere tabellen. Hoe moet je screenreader zo nice mogelijk maken. Supernova testen? Tabben zegt onder? 

Mijn opdracht was om een tabel te maken die goed door een screenreader te lezen is. Dit heb ik gedaan door middel van tabindexen. Hieruit is gebleken dat je tabindex helemaal niet werkt wanneer de Supernova screenreader aanstaat. Het enige waar er naartoe kan worden getabd zijn interactieve elementen zoals buttons, forms en links. Roger vond het visueel wel goed uitzien, maar qua screenreader ging het slecht. 

Mij is het ook opgevallen dat roger moest scrollen om de hele tabel in beeld te krijgen, dit komt waarschijnlijk doordat hij zijn scherm ingezoomd heeft. Ik ga voor de volgende iteratie voornamelijk werken aan interactieve elementen om de screenreader goed werkend te krijgen.

### Test 3 (22-04-2020)
Deze test was een kortere test. Mijn focus lag deze week vooral op het werkend krijgen van de supernova screenreader. Hier zijn een aantal aantekeningen gemaakt tijdens de test: 

>Site is niet gefocused wanneer opstarten.
 Welke toetsencombinatie om alles in een keer op te lezen? 
 Is blij met screenreader, wilt liever luisteren dan kijken
 Wilt graag meer weten over Aria + ariallabel

Mijn implementatie van de screenreader werkt goed. Op basis van de vorige test heb ik een tabel in elkaar gehackt dat eigenlijk bestaat uit links die nergens heen leiden. Deze links hebben echter wel een aria label dat de screenreader kan voorlezen. Roger was ook positief over het resultaat en had zelf ook wat vragen over de technologie erachter zoals aria-label en dergelijke. 

Nu ik weet hoe de screenreader werkt ga ik proberen op een soort dashboard te maken dat data over bijv. Covid-19 opleest met behulp van de Supernova screenreader.

## Conclusie
Om eerlijk te zijn vond ik het testen nogal lastig. Ik ben geen designer dus weet ik niet echt hoe je het beste een design moet testen. Dat ik samen met iemand met een beperking moet testen is lastig en het feit dat dit remote moet maakt dit nog moeilijker. 

Ik wist bijvoorbeeld niet echt wat ik moest vragen aan Roger. Als ik iets test kijk ik meer naar de handeling van de testpersoon dan wat de testpersoon zegt. Sinds het testen remote ging kon ik dus eigenlijk niet naar de handelingen van Roger kijken. Ik had op zich kunnen vragen dat hij hardop ging zeggen welke toetsen / toetsencombinaties hij bijv. indrukt. De Supernova screenreader die overschrijft alle standaard toetsencombinaties voor hun eigen en je hebt dus niet echt de optie om je eigen toetsencombinaties te implementeren omdat er niet echt duidelijke documentatie is welke nou gebruikt worden door Supernova.

Het is ook best belangrijk om je testpersoon op zijn gemak te stellen, hierdoor is de testpersoon wellicht spraakzamer en krijg je meer informatie. Dit kan worden bereikt door middel van een introductie of iets dergelijks, iets wat ik niet echt heb gedaan tijdens mijn tests. 

Dat Roger zijn scherm deelde was ontzettend handig voor het remote testen. Hierdoor heb kan je ook een beetje de handelingen van een testpersoon zien en hoe de testpersoon zijn computer gebruikt. Hierdoor ben ik bijv. erachter gekomen dat Roger zijn scherm wat heeft ingezoomd en dat Roger vaak dark-mode gebruikt.


