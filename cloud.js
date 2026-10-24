// Cloud-Speicher über Firebase Firestore.
// Partien liegen unter groups/{gruppencode}/games/{partie-id}.
import { FIREBASE_CONFIG } from './config.js';

const V = '10.12.2';

async function init() {
  if (!FIREBASE_CONFIG || !FIREBASE_CONFIG.apiKey) { window.cloudFailed(null); return; }
  try {
    const { initializeApp } = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`);
    const fs = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`);
    const app = initializeApp(FIREBASE_CONFIG);
    let db;
    try {
      // Offline-Puffer: Änderungen werden lokal gespeichert und später hochgeladen
      db = fs.initializeFirestore(app, {
        localCache: fs.persistentLocalCache({ tabManager: fs.persistentMultipleTabManager() }),
      });
    } catch (e) {
      db = fs.getFirestore(app);
    }
    let unsub = null;
    window.Cloud = {
      put: (g, rec) => fs.setDoc(fs.doc(db, 'groups', g, 'games', rec.id), rec),
      del: (g, id) => fs.deleteDoc(fs.doc(db, 'groups', g, 'games', id)),
      watch: (g, onData, onErr) => {
        if (unsub) unsub();
        unsub = fs.onSnapshot(
          fs.collection(db, 'groups', g, 'games'),
          { includeMetadataChanges: true },
          (snap) => onData(snap.docs.map((d) => d.data()), snap.metadata),
          onErr
        );
      },
      stop: () => { if (unsub) unsub(); unsub = null; },
    };
    window.cloudReady();
  } catch (e) {
    window.cloudFailed(e);
  }
}

init();
