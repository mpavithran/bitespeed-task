import {Sequelize} from 'sequelize';

let DB_URL=process.env.DB_EXTERNAL_URL!==""?process.env.DB_EXTERNAL_URL:process.env.DB_INTERNAL_URL
console.log(DB_URL)
const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false, 
});

let connection;

if (!connection)
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database Connected Successfully");
      connection = true;
    })
    .catch((err) => {
      console.error("Database Connection Error:", err);
    });
	
export default sequelize;