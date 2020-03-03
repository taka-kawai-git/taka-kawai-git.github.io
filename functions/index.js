const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();

/* -------- Collect Shards and update likes -------- */

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
            likes = sumup(doc, likes);
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

/* -------- Collect Shards and update votes -------- */

exports.updateVotes = functions.https.onRequest((req, res) => {
    firestore.collection('domains').get()
    .then(querySnapshot => {
        querySnapshot.forEach(domainDoc => {
            updateVotesInVotes(domainDoc.id, res);
        });
        return null;
    })
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
    res.send("Success Update");
})


function updateVotesInVotes(docId, res) {
    firestore.collection('domains').doc(docId).collection('votes').get()
    .then(querySnapshot => {
        querySnapshot.forEach(voteDoc => {
            console.log(voteDoc.id);
            updateVotesInVote(voteDoc, res);
        });
        return null;
    })
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
}


function updateVotesInVote(voteDoc, res) {
    var votes = [];
    votes = voteDoc.data().votes;

    voteDoc.ref.collection('shards').get()
    .then(shardSnapshot => {
        shardSnapshot.forEach(doc => {
            votes = sumup(doc, votes);
        });
        voteDoc.ref.update({
            votes: votes
        })
        return null;
    })
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
}

/* -------- Helpers -------- */

function sumup(doc, counts) {
    doc.data().counts.forEach(value => {
        counts[value]++;
    })
    return counts;
}