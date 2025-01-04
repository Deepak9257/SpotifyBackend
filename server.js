const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {HOST, PORT} = require('./config/index');
const AuthRoutes = require('./routes/AuthRoutes');
require("./database/index");
const artistRoute = require("./routes/ArtistRoute")
const albumRoute = require('./routes/AlbumRoute')
const songRoute = require('./routes/SongRoute')
const PlaylistRoute = require('./routes/PlaylistRoute');
const PlaylistSongRoute = require('./routes/PlaylistSongRoute')
const PricingPlanRoute = require('./routes/PricingRoute')
const PaymentRoute = require("./routes/PaymentRoute")
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get("/",(req,res) => {
    res.json({msg : "API server is working"});
});

app.use("/artist", artistRoute)
app.use("/album", albumRoute)
app.use("/auth", AuthRoutes);
app.use("/song", songRoute);
app.use("/playlist", PlaylistRoute )
app.use("/playlistSong", PlaylistSongRoute )
app.use("/pricing", PricingPlanRoute )
app.use("/payment",PaymentRoute)



/* admin routes */

const ADMIN_PREFIX = "/admin";
const AdminArtistRoutes = require("./admin/routes/ArtistRoute")
const AdminAlbumRoutes = require("./admin/routes/AlbumRoute")
const AdminAuthRoutes = require("./admin/routes/AuthRoute")
const AdminSongRoutes = require("./admin/routes/SongRoute");
const AdminDashboardRoutes = require('./admin/routes/DashboardRoute');
const AdminPricingPlanRoute = require('./admin/routes/PricingPlanRoute');
const { log } = require('console');


app.use(`${ADMIN_PREFIX}/artist`,AdminArtistRoutes)
app.use(`${ADMIN_PREFIX}/album`,AdminAlbumRoutes)
app.use(`${ADMIN_PREFIX}/auth`,AdminAuthRoutes)
app.use(`${ADMIN_PREFIX}/song`,AdminSongRoutes)
app.use(`${ADMIN_PREFIX}/dashboard`,AdminDashboardRoutes)
app.use(`${ADMIN_PREFIX}/pricingPlan`,AdminPricingPlanRoute)



const server = http.createServer(app,{});

server.listen(PORT,HOST, () => {
     console.log(`server working at : http://${HOST}:${PORT}`);
})