$(function () {

  // DB STUFF
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', 'GA_MEASUREMENT_ID');


  // Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDNKA8JQgvVM6SuFStAh8TOz8YkXRp7r0k",
    authDomain: "timer-3e13e.firebaseapp.com",
    databaseURL: "https://timer-3e13e.firebaseio.com",
    projectId: "timer-3e13e",
    storageBucket: "timer-3e13e.appspot.com",
    messagingSenderId: "173518521523",
    appId: "1:173518521523:web:8e4aed70b12c9ba9cc1cc6",
    measurementId: "G-K2B4L7E9P3"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // Initialize Firestore
  var db = firebase.firestore();

  // var database = firebase.database();


  // JSON obj
  /* {
    uid
    date
    animeSessions#
    workSessions#
  }


  onDisconnect -> perform this query
  grab db ref
  rootref.set({})

  */

  const signInWithFacebookButton = document.getElementById('signInWithFacebook');

  const signInWithFb = () => {
    // FB Provider
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });

  }


  signInWithFacebookButton.addEventListener('click', signInWithFb);


  // Then, you can also retrieve the 
  // Facebook provider's OAuth token by calling getRedirectResult when your page loads:

  firebase.auth()
    .getRedirectResult()
    .then((result) => {
      if (result.credential) {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;


        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = credential.accessToken;
      }

    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });


  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      //if logged in, don't show the login button

      // $("#userDisplay").show(); // user name
      // $("#userDisplay").html(`Hello , ${user.displayName}` )
      $("#signInWithFacebook").hide();
      $("#signOutFacebook").show();
      $("#saveBtn").show();
      var uid = user.uid;


      // ...
    } else {
      // User is signed out
      $("#signInWithFacebook").show();
      $("#signOutFacebook").hide();
      $("#userDisplay").hide(); // user name
      $("#saveBtn").hide();

    }
  });



  function logOutFb() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.

    }).catch((error) => {
      alert(error);
    });
  }


  $("#signOutFacebook").on('click', logOutFb);


  //call this when browser is closed
  //  Collection must be unique for each user...


  // window.addEventListener("beforeunload", function(event) {
  //   console.log("UNLOAD:1");




  //   //event.preventDefault();
  //   event.returnValue = null; //"Any text"; //true; //false;
  //   //return null; //"Any text"; //true; //false;
  // });

  // WHEN SAVE BTN CLICKED, THEN SAVE THE DATA TO DB
  // $("#saveBtn").on('click',()=>{
  //   db.collection("animedoro").add({
  //     uid: firebase.auth().currentUser.uid,
  //     date: new Date(),
  //     animeSessions: parseInt(sessionStorage.getItem("animeSessions")),
  //     workSessions: parseInt(sessionStorage.getItem("workSessions"))
  // })
  // .then((docRef) => {
  //     console.log("Document written with ID: ", docRef.id);
  // })
  // .catch((error) => {
  //     console.error("Error adding document: ", error);
  // });

  // })


  // trigger save data when user closes browser session
  // For many presence-related features, it is useful
  // for your app to
  // know when it is online or offline. Firebase Realtime Database provides a special location at /.info/connected which is updated every time the Firebase Realtime Database client's connection state changes. Here is an example:

  // var connectedRef = firebase.database().ref(".info/connected");
  // connectedRef.on("value", (snap) => {
  //   if (snap.val() === true) {
  //     console.log("connected");
  //   } else {
  // // check if user is logged in
  //     firebase.auth().onAuthStateChanged((user) => {
  //       if (user) {
  //         db.collection("animedoro").add({
  //           uid: firebase.auth().currentUser.uid,
  //           date: new Date(),
  //           animeSessions: parseInt(sessionStorage.getItem("animeSessions")),
  //           workSessions: parseInt(sessionStorage.getItem("workSessions"))
  //       })
  //       } else {
  //         // User is signed out
  //         // ...
  //       }
  //     });

  //     console.log("not connected");

  //   }
  // });

  // on change
  // var ref =database.ref("animedoro");
  // ref.onDisconnect().set("", (err)=>{
  //   if(err){
  //     console.error('could not establish onDisconnect event', err);
  //   }else{
  //     firebase.auth().onAuthStateChanged((user) => {

  //     if(user){
  //       var uid = firebase.auth().currentUser.uid;

  //     var date = new Date().toLocaleDateString();
  //     var data = {
  //       uid,
  //       date,
  //       animeSessions: parseInt(sessionStorage.getItem("animeSessions")),
  //       workSessions: parseInt(sessionStorage.getItem("workSessions"))
  //     }
  //     database.ref("animedoro").push(data)
  //   }

  //   });
  //   }

  //   })



  ///// REPORT :
  // USER CAN SEE THEIR DATA




  /////////////////////////////////////////////////////////////////////////////////////
  ///TIMER CODE
  sessionStorage.setItem("animeSessions", 0);
  sessionStorage.setItem("workSessions", 0);




  // when browser is closed, we will push # of sessions , dateTime, userid
  // DateTime -> MM - DD - YY
  var isAnimeTime = false;
  const startingTimer = 50;
  const animeTimer = 20;
  let time = startingTimer * 60;
  let time2 = animeTimer * 60;
  const countDownElement = document.getElementById("timerDisplay");
  var isPaused = false;
  var startButton = document.getElementById("startBtn");
  var countDown;  // our interval variable
  startButton.onclick = startTimer;

  $("#pauseBtn").on('click', function (e) {
    e.preventDefault();
    clearInterval(countDown);
  });


  function startTimer() {
    //every second, calls back
    isPaused = false;
    countDown = setInterval(updateCountdown, 1000);
  }


  function updateCountdown() {

    if (isAnimeTime && !isPaused) {
      // ANIME TIMER
      const minutes = Math.floor(time2 / 60)
      let seconds = time2 % 60
      seconds = seconds < 10 ? '0' + seconds : seconds
      countDownElement.innerHTML = `${minutes}:${seconds}`
      time2--;
      time2 = time2 < 0 ? 0 : time2;
      time2 = time2 <= 0 ? isAnimeTime = false : time2;
      time2 = time2 <= 0 ? time = startingTimer * 60 : time2;
      // time2 == 0 means countdown is finished

      if (!isAnimeTime) { // anime timer ended
        //get current animeSessions and increment it
        var sessions = parseInt(sessionStorage.getItem("animeSessions"));

        sessionStorage.setItem("animeSessions", ++sessions);
        $("#numberAnimeSessions").text(sessionStorage.getItem("animeSessions"));
        $("#animeTime").hide();
        $("#workTime").show();
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            //find in document where uid == uid && date == date
            // update the counter values 
            var collection = db.collection("animedoro");
            var date = new Date().toLocaleDateString();
            console.log(user.uid);

            var docRef = collection.where("date", "==", date);
            docRef.get().then(function (doc) {
              if (!doc.empty) {
                collection
                  .where("uid", "==", user.uid)
                  .where("date", "==", date)
                  .get()
                  .then(result => {
                    let document = result.docs[0];
                    let sessionToUpdate = document.data();
                    sessionToUpdate.workSessions = sessions;
                    document.ref.update(sessionToUpdate);
                  });
              } else {

                var dataToAdd = {
                  uid: user.uid,
                  date,
                  animeSessions: sessionStorage.getItem("animeSessions"),
                  workSessions: sessionStorage.getItem("workSessions")
                }
                collection.add(dataToAdd)

              }

            });

          }

        });

        playSound("./audio/notification-sound.wav")


      }

    } else if (!isPaused && !isAnimeTime) {
      // WORK TIMER              
      $("#workTime").show();
      // WORK TIMER
      const minutes = Math.floor(time / 60)
      let seconds = time % 60
      seconds = seconds < 10 ? '0' + seconds : seconds
      countDownElement.innerHTML = `${minutes}:${seconds}`
      time--;
      time = time < 0 ? 0 : time;
      time = time <= 0 ? isAnimeTime = true : time;
      time = time <= 0 ? time2 = animeTimer * 60 : time;
      if (isAnimeTime) { // work timer ended
        //get current workSession counter and increment it
        var sessions = parseInt(sessionStorage.getItem("workSessions"));


        sessionStorage.setItem("workSessions", ++sessions);
        $("#numberWorkSessions").text(sessionStorage.getItem("workSessions"));
        $("#animeTime").show();
        $("#workTime").hide();
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            //find in document where uid == uid && date == date
            // if date doesn't exist, then we will need to create a new document
            /*
              uid: user.uid ,
              date: new Date().toLocalTimeString();
            */
            var collection = db.collection("animedoro");
            var date = new Date().toLocaleDateString();

            //get document reference if exists for current date
            var docRef = collection.where("date", "==", date);

            docRef.get().then(function (doc) {
              if (!doc.empty) {
                collection
                  .where("uid", "==", user.uid)
                  .where("date", "==", date)
                  .get()
                  .then(result => {
                    let document = result.docs[0];
                    let sessionToUpdate = document.data();
                    sessionToUpdate.workSessions = sessions;
                    document.ref.update(sessionToUpdate);
                  });
              } else {

                var dataToAdd = {
                  uid: user.uid,
                  date,
                  animeSessions: sessionStorage.getItem("animeSessions"),
                  workSessions: sessionStorage.getItem("workSessions")
                }
                collection.add(dataToAdd)

              }

            });

          }


        });
        playSound("./audio/notification-sound.wav")
      }
    }
  }


  function playSound(path) {
    const audio = new Audio(path);
    audio.volume = 1.0;
    audio.play();
  }



})