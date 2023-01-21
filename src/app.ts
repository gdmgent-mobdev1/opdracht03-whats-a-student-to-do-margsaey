/* eslint-disable no-new */
import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
} from 'firebase/firestore';
import { Card, TodoList } from './Components';
import { State, root } from './Lib';

// import firestore
import { fireStoreDb } from './lib/firebase-init';
// import localstorage from './Lib/localStorage';
// -------------main------------
const addTodoListInput = document.getElementById('addTodoListInput') as HTMLInputElement;
const addTodoListButton = document.getElementById('addTodoListButton') as HTMLElement;

const addTodoListFirebase = async (title: string) => {
  const docRef = await addDoc(colRef, {
    title,
  });
  console.log('Document written with ID: ', docRef.id);
  return docRef.id;
};

addTodoListButton.addEventListener('click', async () => {
  if (addTodoListInput.value.trim() !== '') {
    await addTodoListFirebase(addTodoListInput.value);
    // new TodoList(root, addTodoListInput.value, id);

    addTodoListInput.value = '';
  }
});

const getCards = async (id: string) => {
  const cardsSnapShot = collection(fireStoreDb, `lists/${id}/cards`);
  const qSnap = await getDocs(cardsSnapShot);
  return qSnap.docs.map((d) => (
    {
      id: d.id,
      title: d.data().title,
      description: d.data().description,
      comments: d.data().comments,
      parentId: d.data().parentId,
    }
  ));
};

const createTodoList = ({ id, cards, title }: { id: string; cards: State[], title: string }) => {
  const newList: TodoList = new TodoList(root, title, id);

  cards.forEach((card: State) => {
    new Card(card.title, newList.div as HTMLElement, newList, card.id, id);
    // newList.addToDo();
  });
};

// select collection
// We willen nu referen naar onze collectie `owl-statues`
const colRef = collection(fireStoreDb, 'lists');
// get data
onSnapshot(colRef, (snapshot) => {
  snapshot.docChanges().forEach(async (change) => {
    if (change.type === 'added') {
      // snapshot.docs.forEach(async (doc) => {
      //   addTodoListInput.value = '';
      const cards = await getCards(change.doc.id);
      const { id } = change.doc;
      const { title } = change.doc.data();
      createTodoList({
        title, id, cards, ...change.doc.data(),
      });
      // });
    }
    if (change.type === 'modified') {
      // rerendering
    }
    if (change.type === 'removed') {
      // removing
    }
  });

  // document.querySelector('#app')!.innerHTML = '';
});
// const snapshot =  await getDocs(colRef);

// lists.forEach((listElement) => {
//   console.log(listElement)

//   // listElement.cards.forEach(
//   //   (card) => {
//   //     // newList.addToDo(card.)
//   //   }
//   // )

// });
