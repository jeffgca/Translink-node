test("some test", function() {
    ok(true);
})

test("Test if socket is an object", function() {
    console.log(typeof(socket));
    ok((typeof(socket) === 'object'));
});

test("Test is we can ping", function() {
    var ping = {payload}
    socket.send()
    ok(true);
})