import firebase from '@firebase/app';
import '@firebase/firestore';

let isInitialized = false;
const initFirebase = () => {
	if (!isInitialized) {
		const config = {
			apiKey: process.env.REACT_APP_API_KEY,
			authDomain: process.env.REACT_APP_AUTH_DOMAIN,
			databaseURL: process.env.REACT_APP_DATABASE_URL,
			projectId: process.env.REACT_APP_PROJECT_ID,
			storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
			messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
			appId: process.env.REACT_APP_APP_ID,
		};
		firebase.default.initializeApp(config);
		isInitialized = true;
	}
};

export const getFirestore = async (collectionName) => {
	initFirebase();
	const db = await firebase.firestore().collection(collectionName).get();

	return db;
};
export const addEquipment = async (data) => {
	initFirebase();

	let fileStore = firebase.firestore();
	console.log('adding inventory...');
	const added = await fileStore.collection('inventory').add({
		name: data.name,
		count: data.count,
		place: fileStore.collection('places').doc(data.placeId),
	});
	console.info('Done!');
	return added;
};
export const removeEquipment = async (id) => {
	initFirebase();
	let fileStore = firebase.firestore();
	await fileStore.collection('inventory').doc(id).delete();
	console.info('Done!');
};
export const updateEquipment = async (data) => {
	initFirebase();
	let fileStore = firebase.firestore();
	await fileStore.collection('inventory').doc(data.id).update({
		count: data.count,
	});
	console.info('Done!');
};
