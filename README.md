# Progetto Programmazione Avanzata
  Miccini, Pesaresi
  
## Obiettivo del progetto
Back-end per la realizzazione di un servizio che consente di gestire delle ast di vario tipo:
* Asta inglese aperta
* Asta in busta chiusa e pagamento del prezzo più alto, nella quale gli offerenti inseriscono la loro offerta in una busta sigillata e la consegnano al banditore. L’individuo con l’offerta più alta vince l’asta, pagando un prezzo pari all’ammontare offerto. 
* Asta in busta chiusa e pagamento del secondo prezzo più alto, con lo stesso funzionamento della precedente in cui, però, l’individuo con l’offerta più alta vince l’asta, pagando un prezzo pari al secondo ammontare offerto più alto.

In particolare, il sistema prevede la possibilità di:
* Creare una nuova asta
* Visualizzare l’elenco delle aste filtrando per non ancora aperte, in esecuzione, terminate
* Visualizzare da parte di un utente il proprio credito residuo
* Visualizzare lo storico delle aste alle quali si è partecipato
* Visualizzare lo storico delle aste alle quali si sta partecipando listando tutti gli eventuali rilanci
* Ricaricare un dato utente da parte di un utente Admin
* Visualizzare lo storico delle aste alle quali si è partecipato distinguendo per quelle che sono state aggiudicate e no
* Visualizzare lo storico delle aste alle quali si è partecipato distinguendo per quelle che sono state aggiudicate e no, specificando un range temporale

## Progettazione

### Diagrammi UML 
#### Diagramma dei casi d'uso

Tramite un diagramma "Use case" sono rappresente le relazioni tra gli utenti e le sue richieste.
Esistono 3 tipo di utenti:
* Bip Creator, il quale ha accesso ad una rotta che consente di creare una nuova asta
* Admin, che può ricaricare il portafoglio di un dato utente
* Bip Partecipant, che può parteciare alle aste.

Non è, invece, necessaria alcuna autentificazione per accedere alle tre rotte sulla destra (visualizzare l'elenco delle aste filtrandole per lo stato, visualizzare lo storico delle aste cui si è partecipato/ si sta partecipando mostrando il numero di rilanci)

<img src = "img_src/UseCase.png">

#### Schema ER

<img src = "img_src/ER.drawio.png">
Il database è composto da 3 tabelle:
* USER: contiente tutte le informazioni relative all'utente ed ha come chiave primaria l'id dell'utente.
* AUCTION : contiene tutte le informazioni relative alle aste ed ha come chiama primaria l'id dell'asta, mentre la chiave esterna (che contiene informazioni riguardo il creatore dell'asta) fa riferimento allo user_id nella tabella User.
* ENTER: contiene informazioni aggiuntive e deriva dalla relazione molti a molti tra USER e AUCTION

### Diagramma delle sequenze

Vengono riportati alcuni diagrammi delle sequenze per descrivere una sequenza di azioni che vengono eseguita quando si accede ad una specifica rotta.
* **Chiamata GET /showtoken :**
<img src = "img_src/showToken.drawio.png">

* **Chiamata POST /CreateAuction :**
<img src = "img_src/CreateAuction.drawio.png">

* **Chiamata POST /charging :**
<img src = "img_src/charging.drawio.png">

### Pattern utilizzati
* **Singleton**, un modello di Creational Design Pattern che garantisce che una classe abbia una sola istanza, fornendo al contempo un punto di accesso globale a quest'ultima istanza. E' stato utilizzato per effettuare la connessione al database.

* **CoR and middleware**, un behavioral design pattern che consente di passare le richieste lungo una catena di gestori. Sono stati implementati degli strati middleware per ogni rotta del server. 

* **Fatory**, un Creational Design Pattern che fornisce un'interfaccia interfaccia per la creazione di oggetti in una superclasse, ma permette alle
sottoclassi di modificare il tipo di oggetti che verranno creati.
