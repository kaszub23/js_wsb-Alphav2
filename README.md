# PseudoForms

<p>Autorzy: Klaudia Gawrysiak, Wiktor Piechowiak, Bartosz Cieżuch, Damian Kaszubowski</p>

<p>Zamysłem całego projektu jest stworzenie strony na której każda chętna osoba będzie w stanie stworzyć ankietę. Ankiety będzie można tworzyć bez rejestracji konta na stronie. Istnieje możliwość stworzenia konta, które pozwala na śledzenie ankiet które się stworzyło.</p>
Same formularze składają się z prostych pytań tworzonych przez autora. Na każde pytanie można ustawić wybrany typ oczekiwanej odpowiedzi (wybór jednokrotny, wielokrotny lub pytanie "otwarte").

## Wymagania

Zainstalowany Node.js, dostęp do internetu (do pobrania potrzebnych modułów), sprawna przeglądarka internetowa (IE nie zaliczamy do tego)

## Uruchomienie projektu

W celu uruchomienia projektu, potrzeba osobno uruchomić część Backendową oraz Frontendową

### Za pomocą VS Code:

Otwórz folder pseudoforms w VS Code<br>

#### Backend

Przejdź do folderu pseudoforms_backend<br>
Uruchom terminal będąc w folderze <code>pseudoforms_backend</code><br>
Uruchom aktualizację modułów:
```
npm update
```
Wciśnij przycisk F5 oraz wybierz Node, aby uruchomić backend<br>
<b>_lub_</b>
<br>w terminalu wpisz 
```
npm start
```

#### Frontend

Przejdź do folderu pseudoforms_frontend<br>
Uruchom terminal będąc w folderze <code>pseudoforms_frontend</code><br>
Uruchom aktualizację modułów:
```
npm update
```
Wciśnij przycisk F5 oraz wybierz Node, aby uruchomić backend<br>
<b>_lub_</b>
<br>w terminalu wpisz 
```
npm run dev
```

### Przy pomocy wiersza poleceń CMD (windows):

#### Backend

Otwórz okno CMD

Wejdź do folderu pseudoforms:
```
cd C:\_ścieżka do folderu_\pseudoforms_backend
```
Wykonaj najpierw aktualizację modułów:
```
npm update
```
Potem uruchom projekt backendu:
```
npm start
```


#### Frontend

Otwórz kolejne okno CMD

Wejdź do folderu pseudoforms_frontend:
```
cd C:\_ścieżka do folderu_\pseudoforms_frontend
```
Wykonaj aktualizację modułów:
```
npm update
```
Następnie uruchom projekt frontendu:
```
npm run dev
```
Po chwili w konsoli pojawi się informacja z adresem, na którym działa strona.

## Użyte technologie

<p>W projekcie zastosowano:
    <ul>
        <li>JavaScript</li>
        <li> Node</li>
        <li> Express</li> 
        <li> SQLite</li>
        <li> HTML/CSS</li>
    </ul>
</p>
<p>Dodatkowo:
    <ul>
        <li>Swagger - do wygodnego testowania API</li>
        <li>Vue - Framework frontendowy, do tworzenia UI użytkownika</li>
    </ul>
</p>

## Funkcjonalności
    
<ul>
    <li>Użytkownicy:</li>
        <ul>
            <li>Rejestrowanie nowego użytkownika</li>
            <li>Modyfikowanie aktualnego użytkownika:</li>
                <ul>
                    <li>zmiana nazwy użytkownika</li>
                    <li>zmiana hasła użytkownika</li>
                </ul>
            <li>Wylogowanie aktualnego użytkownika</li>
            <li>Usuwanie aktualnego użytkownika</li>
        </ul>
    <li>Formularze:</li>
        <ul>
            <li>Dodawanie nowego formularza:</li>
            <li>Możliwość tworzenia pytań:</li>
                <ul>
                    <li>jednokrotnego wyboru</li>
                    <li>wielokrotnego wyboru</li>
                    <li>"otwartych"</li>
                </ul>
            <li>Pobranie informacji o wszystkich formularzach</li>
            <li>Pobranie informacji o wybranym formularzu</li>
            <li>Wypełnianie wybranego formularza</li>
            <li>Usuwanie wybranego formularza</li>
        </ul>
</ul>

## Architektura projektu
<ul style="list-style-type:none;">
    <li>Backend</li>
        <ul style="list-style-type:none;">
            <li>Kontrolery (Controllers)</li>
                <ul style="list-style-type:none;">
                    <li>userController</li>
                    <li>surveyController</li>
                </ul>
            <li>Modele (Models)</li>
                <ul style="list-style-type:none;">
                    <li>userModel</li>
                    <li>surveyModel</li>
                </ul>
            <li>Ściężki/trasowanie (routes)</li>
                <ul style="list-style-type:none;">
                    <li>userRoute</li>
                    <li>surveyRoute</li>
                </ul>
            <li>Serwisy (services)</li>
                <ul style="list-style-type:none;">
                    <li>userServices</li>
                    <li>surveyServices</li>
                </ul>
            <li>Baza danych (data)</li>
        </ul>
    <li>Frontend</li>
        <ul style="list-style-type:none;">
            <li>src (Źródła)<li>
                <ul style="list-style-type:none;">
                    <li>assets</li>
                        <ul style="list-style-type:none;">
                            <li>main.css</li>
                        </ul>
                    <li>components</li>
                        <ul style="list-style-type:none;">
                            <li>Footer</li>
                            <li>Header</li>
                            <li>HeroSection</li>
                            <li>RecentForms</li>
                        </ul>
                    <li>router</li>
                        <ul style="list-style-type:none;">
                            <li>index</li>
                        </ul>
                    <li>views</li>
                        <ul style="list-style-type:none;">
                            <li>AddForms</li>
                            <li>AllForms</li>
                            <li>FillForms</li>
                            <li>LandingPage</li>
                            <li>Login</li>
                            <li>ManageAccount</li>
                            <li>MyForms</li>
                        </ul>
                </ul>
        </ul>

</ul>


## Informacje dodatkowe

folder <b>***Inne***</b> - folder roboczy, przeznaczony na zipy, które grupa wysyłała jako etapy, prace testowe, zadania rozwiązywane na zajęciach<br>
folder <b>***pseudoforms_backend***</b> - folder z plikami backendu<br>
folder <b>***pseudoforms_frontend***</b>  - folder z plikami frontendu<br>
