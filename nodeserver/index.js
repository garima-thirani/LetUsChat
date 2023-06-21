//Node Server which will handle socket io connections

const io = require('socket.io')(8000, {
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    }
    })//to use socket.io on 8000 port it is an http instance

const cors = require('cors');
// app.use(cors());
const users ={};
//this server will listen to particular connections
io.on('connection',socket=>{     //io.on is an socket.io instance 
    socket.on('new-user-joined',username=>{ //socket.on will handle request related to a particular instance it accepts an user joined event and set username as user 
        users[socket.id]=username;
        socket.broadcast.emit('user-joined',username) //will emit the event to rest other than the one joined the chat
    

    });
    socket.on('send',message=>{ //if someone send some message others must receive it 
        socket.broadcast.emit('receive',{message:message,username:users[socket.id]})
    });
    socket.on('disconnect',message=>{ //if someone send some message others must receive it 
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
})
