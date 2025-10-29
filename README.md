# Inlämning 2 - Hushållet

> Grupp: D4estation - Josef, Arvid, Erik, Daniel, Elin

En todo mobil-app för SUVNET24 hösten 2025, för hushåll och grupper som vill samarbeta kring hemmasysslor. Appen gör det enkelt att skapa, registrera, och följa upp sysslor, samt ger översikt och statistik över vad som gjorts och av vem. Varje användare har en personlig profil med avatar och kan byta mellan olika hushåll.

Projektet är byggt med Expo och React Native för smidig mobilutveckling, med React Native Paper för UI-komponenter och TanStack Query för datahantering. Backend och autentisering via Firebase.

Syftet är att underlätta vardagslogistik och skapa rättvisa kring sysslor i hemmet, med stöd för flera användare, hushåll och personlig anpassning. Appen har stöd för statistik, temaväxling, och CI ([GitHub Action](.github/workflows/code-quality.yml)) för kvalitetssäkring.

## Bygga och köra projektet

1. Klona repot:
   ```bash
   git clone https://github.com/gherghett/Hushall
   ```
2. Installera beroenden:
   ```bash
   npm install
   ```
3. Starta appen:
   ```bash
   npx expo start
   ```

## Kravlista

### Kravlista (4/4)

- [x] En logga, splashscreen och appikon ska designas och användas. \*
- [x] Applikationen ska byggas med RN, Expo & TS. \*
- [x] Designen av appen ska utgå ifrån befintliga skisser, undantag kan ges men ska diskuteras
      med produktägare, godkännas och dokumenteras. \*
- [x] Information ska kommuniceras till och från en server.

### Hushåll (2/7)

- [x] Ett hushåll ska ha ett namn och en genererad (enkel) kod så andra kan gå med i hushållet,
      namnet ska gå att ändra. \*
- [x] Alla användare i ett hushåll ska kunna se vilka som tillhör ett hushåll.
- [] En ägare av ett hushåll ska kunna se förfrågningar om att gå med i hushållet.
- [] En ägare ska kunna acceptera eller neka förfrågningar.
- [] En ägare ska kunna göra andra till ägare.
- [] En ägare ska kunna pausa en användare och under pausade perioder ska användare inte
  tas med i statistiken.
- [] Om en använder har pausats under en del av en period i statistiken ska graferna
  normaliseras.

### Konto (3/5)

- [x] En användare ska kunna registrera och logga in sig. \*
- [x] En användare ska kunna skapa ett nytt hushåll. \*
- [x] En användare ska kunna gå med i ett hushåll genom att ange hushållets kod. \*
- [] När en användare har valt att gå med i ett hushåll behöver en ägare av hushållet först
  godkänna användaren.
- [] En användare ska kunna lämna ett hushåll.

### Profil (6/6)

- [x] En användare ska kunna ange sitt namn. \*
- [x] En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista. \*
- [x] Valda avatarer ska inte kunna väljas av andra användare i hushållet. \*
- [x] Avataren ska användas i appen för att visa vad användaren har gjort. \*
- [x] En användare ska kunna ställa in appens utseende (mörkt, ljust, auto).
- [x] Om en användare tillhör två eller fler hushåll ska denne kunna välja att byta mellan de
      olika hushållen.

### Sysslor (4/6)

- [x] En ägare ska kunna lägga till sysslor att göra i hemmet. \*
- [x] En syssla ska ha ett namn, en beskrivning (text), hur ofta den ska göras (dagar), och en
      vikt som beskriver hur energikrävande den är. \*
- [] En användare ska kunna lägga till en ljudinspelning och en bild för att beskriva sysslan
  ytterligare.
- [x] En ägare ska kunna redigera en syssla. \*
- [x] En ägare ska kunna ta bort en syssla.
- [] När en syssla tas bort ska användaren få en varning om att all statistik gällande sysslan
  också kommer att tas bort och få valet att arkivera sysslan istället.

### Dagsvyn (3/3)

- [x] Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras. \*
- [x] Utöver sysslans namn ska även vem/vilka som har gjort sysslan visas, hur många dagar
      sedan sysslan gjordes senast samt om den är försenad. \*
- [x] När en användare väljer en syssla ska beskrivningen av sysslan visas och det ska även
      med ett enkelt tryck gå att markera sysslan som gjord. \*

### Statistik (5/6)

- [x] En användare ska kunna se fördelningen av gjorda sysslor mellan användarna i sitt
      hushåll. \*
- [x] Varje statistikvy ska visa den totala fördelningen (inräknat vikterna för sysslorna) samt
      fördelning av varje enskild syssla. \*
- [x] Det ska finnas en statistikvy över ”nuvarande vecka”. \*
- [x] Det ska finnas en statistikvy över ”förra vecka”.
- [x] Det ska finnas en statistikvy över ”förra månaden”.
- [] Om det inte finns statistik för en av vyerna ska den vyn inte visas.

### Schemaläggning (0/3)

- [] En ägare ska kunna tilldela och ta bort sysslor från användare i hushållet.
- [] Användare ska kunna se de tilldelade sysslorna i sitt gränssnitt.
- [] En ägare ska kunna skapa grupper av sysslor som automatiskt tilldelas användarna i
  hushållet och roteras baserat på ett intervall i dagar.
