import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC0tkiVx89eNQJozHAUPBGRqonTB6M6ShE",
    authDomain: "itistudies-4b277.firebaseapp.com",
    projectId: "itistudies-4b277",
    storageBucket: "itistudies-4b277.firebasestorage.app",
    messagingSenderId: "549937347076",
    appId: "1:549937347076:web:72231b8f1bde6c2dd15351"
};

const app = getApps().length === 0 ?
    initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

async function countVisitor() {
    try {
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem('iti_last_visit');
        if (!localStorage.getItem('iti_visitor_id')) {
            localStorage.setItem('iti_visitor_id',
                Date.now().toString(36) + Math.random().toString(36).substr(2));
        }
        if (lastVisit === today) return;
        localStorage.setItem('iti_last_visit', today);
        const visitorRef = doc(db, 'appData', 'visitorCount');
        const visitorDoc = await getDoc(visitorRef);
        if (visitorDoc.exists()) {
            await updateDoc(visitorRef, {
                total: increment(1),
                lastVisit: new Date().toISOString(),
                lastPage: window.location.pathname
            });
        } else {
            await setDoc(visitorRef, {
                total: 1,
                lastVisit: new Date().toISOString(),
                lastPage: window.location.pathname
            });
        }
    } catch(e) {
        console.log('Visitor count:', e);
    }
}

countVisitor();