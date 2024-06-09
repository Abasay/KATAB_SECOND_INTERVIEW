const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const redirect = require('express-redirect');
app.use(bodyParser.json({ limit: '500mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    parameterLimit: 10000,
  })
);
const mongoConnect = require('./helpers/mongoConnect');
const cloudinaryConnect = require('./helpers/cloudConnect');

dotenv.config();

const PORT = process.env.SERVER_PORT || 8080;

// app.use(express.json());
// app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routes/userRouter');
const transactionRouter = require('./routes/transactionRoute');
const generatePDF = require('./middlewares/transportIdPDFFile');
const vpnMiddleware = require('./middlewares/vpnmiddleware');

app.use(cors());
app.use(vpnMiddleware)

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/transactions', transactionRouter);

// app.use((req, res, next) => {
//     if (req.header('x-forwarded-proto') !== 'https') {
//         res.redirect(`https://${req.header('host')}${req.url}`);
//     } else {
//         next();
//     }
// });

app.get('/', async (req, res) => {
  //console.log(req.body);
  req.body = '';
  //console.log(req.body);
  res.status(200).json({
    success: true,
    data: {
      message: 'Welcome to the C&M Services RESTFUL APIs',
    },
  });
});

// const imageUrl =
//   'https://media.istockphoto.com/id/1370942141/photo/thank-you-note-with-a-pen-on-a-desk.webp?b=1&s=170667a&w=0&k=20&c=rVIUYQBsZQNyzx7M2OvuXZjVeLuw1fpVuU0YZs1vuWI=';
// const greetingMessage = 'Thanks for patronizing us!!!';
// const transportId = 'Here is your Transport Id: XYZ123';
// const filename = 'transport_id.pdf';
// generatePDF(imageUrl, greetingMessage, transportId, filename);
mongoConnect();
cloudinaryConnect();

app.listen(5050, () => {
  //console.log('Server is running on port: ' + PORT);
});
