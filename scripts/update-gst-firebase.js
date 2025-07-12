// Script to update GST number for all products in Firebase
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcMfiwwWEk3qUEy3MdDixYyK-Ul9jbStw",
  authDomain: "treenuts.firebaseapp.com",
  projectId: "treenuts",
  storageBucket: "treenuts.appspot.com",
  messagingSenderId: "132596762208",
  appId: "1:132596762208:web:46dd487de1baf2c5a2a505",
  measurementId: "G-8NDL5ZBW0W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateGSTForAllProducts() {
  try {
    console.log('Starting GST update for all products...');
    
    // Get all products from Firestore
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);
    
    console.log(`Found ${querySnapshot.size} products to update`);
    
    let updatedCount = 0;
    const batch = [];
    
    // Update each product
    querySnapshot.forEach((document) => {
      const productData = document.data();
      const newGST = '08CYZPJ048Q1Z9';
      
      // Only update if GST is different or missing
      if (productData.gstNumber !== newGST) {
        batch.push({
          docRef: doc(db, 'products', document.id),
          data: { gstNumber: newGST }
        });
        updatedCount++;
      }
    });
    
    // Execute all updates
    for (const update of batch) {
      await updateDoc(update.docRef, update.data);
      console.log(`Updated product: ${update.docRef.id}`);
    }
    
    console.log(`Successfully updated GST number for ${updatedCount} products`);
    console.log('All products now have GST number: 08CYZPJ048Q1Z9');
    
  } catch (error) {
    console.error('Error updating GST numbers:', error);
  }
}

// Run the update
updateGSTForAllProducts(); 