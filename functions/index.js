const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();

exports.updateLikes = functions.https.onRequest((req, res) => {
    firestore.collection('domains').get()
    .then(querySnapshot => {
        querySnapshot.forEach(domainDoc => {
            updateLikesInThreads(domainDoc.id, res);
        });
        return null;
    })
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
    res.send("Success Update");
})


function updateLikesInThreads(docId, res) {
    firestore.collection('domains').doc(docId).collection('threads').get()
    .then(querySnapshot => {
        querySnapshot.forEach(threadDoc => {
            console.log(threadDoc.id);
            updateLikesInThread(threadDoc, res);
        });
        return null;
    })
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
}


function updateLikesInThread(threadDoc, res) {
    var likes = [];
    likes = threadDoc.data().likes;
    
    threadDoc.ref.collection('shards').get()
    .then(shardSnapshot => {
        shardSnapshot.forEach(doc => {
            likes = sumupLikes(doc, likes);
        });
        threadDoc.ref.update({
            likes: likes
        })
        return null;
    })
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
}

function sumupLikes(doc, likes) {
    doc.data().likes.forEach(value => {
        likes[value]++;
    })
    return likes;
}