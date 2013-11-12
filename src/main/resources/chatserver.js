var container = require("vertx/container");
var console = require("vertx/console");
var eb = require('vertx/event_bus');
var serverConfig = {
    "web_root": "src/main/webapp",
    "port": 7001,
    "bridge": true,
    "inbound_permitted": [{"address_re": "chat\\..+"},{"address": "users/signIn"}, {"address": "messages/post"}],
    "outbound_permitted": [{"address": "users/signedIn"}, {"address": "messages/posted"}],
    "sjs_config": {"prefix": "/chat"}
};

container.deployModule("io.vertx~mod-web-server~2.0.0-final", serverConfig);

eb.registerHandler("users/signIn", function (args, reply) {
    reply({"status": 200});
    eb.publish("users/signedIn", args)
});

eb.registerHandler("messages/post", function (args, reply) {
    console.log("messages/post: " + args);
    eb.publish("messages/posted", args);
});

console.log("ChatVerticle.js started");