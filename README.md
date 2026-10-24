# Druck Drauf!

Zugzeit-Uhr für Brettspielabende. Läuft im Browser und lässt sich am Android-Handy als App installieren (Chrome-Menü - "Zum Startbildschirm hinzufügen").

## Funktionen

- Spielname vor jeder Partie (zuletzt gespielte Spiele als Schnellauswahl)
- Beliebig viele Spieler, jeweils mit Name und Farbe (Palette oder eigene Farbe)
- Reihenfolge per Pfeilen oder Würfel festlegen
- Riesiger Tipp-Button in Spielerfarbe: Tippen = nächster Spieler
- Name und Zugzeit doppelt angezeigt (einmal auf dem Kopf) - für das Handy in der Tischmitte
- Pause, kleiner Zurück-Button mit Sicherheitsabfrage, Rundenzähler
- Ton und Vibration beim Zugwechsel (Doppelton bei neuer Runde)
- Statistik am Ende: Gesamtzeit, Züge, Durchschnitt, längster Zug, Titel
- Partien-Log mit Langzeit-Statistik nach Spieler, Spiel und Verlauf, Backup als Datei
- Gemeinsame History über mehrere Geräte (Firebase Firestore), Beitritt per Einladungslink, einzelne Partien für alle löschbar
- Spieler bleiben gespeichert, laufende Partie übersteht Neuladen
- Bildschirm bleibt während der Partie an, funktioniert offline

Ohne Gruppe bleiben alle Daten lokal im Browser. Mit Gruppe liegen die Partien zusätzlich in Firestore unter `groups/{gruppencode}/games/{id}`; Zugriff hat nur, wer den geheimen Gruppencode aus dem Einladungslink kennt (siehe `firestore.rules`).

## Firebase einrichten

1. Firebase-Projekt anlegen, Firestore-Datenbank erstellen (Standort Europa)
2. Inhalt von `firestore.rules` als Regeln veröffentlichen
3. Web-App registrieren und die Konfiguration in `config.js` eintragen
